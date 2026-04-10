/**
 * Clinical Controller
 * Coordinates ingestion, resolution, and HITL state management.
 */

const normalizationService = require('../services/normalizationService');
const resolutionService = require('../services/resolutionService');

// In-memory "Golden Record" store
const goldenRecords = [];
const hitlQueue = [];

class ClinicalController {
    ingest(req, res) {
        try {
            const rawData = req.body;
            const normalized = normalizationService.normalize(rawData);

            // Run Entity Resolution
            const result = resolutionService.resolve(normalized, goldenRecords);

            if (result.status === 'merge') {
                console.log(`[Resolution] Auto-merging record for ${normalized.name}`);
                const index = goldenRecords.findIndex(r => r.id === result.match.id);
                // Simple merge: append source and update timestamp
                goldenRecords[index] = {
                    ...goldenRecords[index],
                    mergedSources: [...(goldenRecords[index].mergedSources || []), normalized.source],
                    lastUpdatedAt: new Date().toISOString()
                };
                return res.status(200).json({ status: 'merged', recordId: result.match.id });
            }

            if (result.status === 'hitl') {
                console.log(`[Resolution] LOW CONFIDENCE: Routing ${normalized.name} to HITL Queue (Score: ${result.score.toFixed(2)})`);
                const queueItem = {
                    id: normalized.id,
                    incoming: normalized,
                    potentialMatch: result.match,
                    score: result.score,
                    status: 'pending_review'
                };
                hitlQueue.push(queueItem);
                return res.status(202).json({ status: 'queued_for_review', queueId: queueItem.id });
            }

            // New Patient
            console.log(`[Resolution] New Patient detected: ${normalized.name}`);
            goldenRecords.push({
                ...normalized,
                mergedSources: [normalized.source],
                lastUpdatedAt: new Date().toISOString()
            });
            return res.status(201).json({ status: 'created', recordId: normalized.id });

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Ingestion failed' });
        }
    }

    getRecords(req, res) {
        res.json(goldenRecords);
    }

    getQueue(req, res) {
        res.json(hitlQueue);
    }

    resolveQueue(req, res) {
        const { queueId, action } = req.body; // action: 'merge' | 'create_new'
        const index = hitlQueue.findIndex(q => q.id === queueId);
        
        if (index === -1) return res.status(404).json({ error: 'Queue item not found' });

        const item = hitlQueue[index];
        if (action === 'merge') {
            const gIndex = goldenRecords.findIndex(r => r.id === item.potentialMatch.id);
            goldenRecords[gIndex].mergedSources.push(item.incoming.source);
        } else {
            goldenRecords.push(item.incoming);
        }

        hitlQueue.splice(index, 1);
        res.json({ status: 'resolved', action });
    }
}

module.exports = new ClinicalController();

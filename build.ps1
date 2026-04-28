cd frontend
npm run build
Copy-Item -Path ".next" -Destination ".\.next" -Recurse -Force
cd ..

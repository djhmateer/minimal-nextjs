#!/bin/bash

echo "Step 1: Pulling latest changes..."
git pull

echo "Step 2: Building application..."
step_start=$(date +%s)
pnpm build
step_end=$(date +%s)
echo "Build completed in $((step_end - step_start)) seconds"

echo "Step 3: Starting application..."

# Have got middleware.js for logging on prod
pnpm start

# noisy
# DEBUG=next:* pnpm start

# still noisy
# DEBUG=next:router-server:main pnpm start








# step_end=$(date +%s)
# echo "Start completed in $((step_end - step_start)) seconds"

# end_time=$(date +%s)
# total_time=$((end_time - start_time))
# echo "Total deployment time: $total_time seconds"
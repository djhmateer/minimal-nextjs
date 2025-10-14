#!/bin/bash

# Kill any existing instances of go.sh (except current process)
echo "Killing any existing instances of go.sh..."
ps -ef | grep '/bin/bash ./go.sh' | grep -v grep | grep -v $$ | awk '{print $2}' | xargs -r kill -9
sleep 1

echo "Step 1: Pulling latest changes..."
git pull

echo "Step 2: Installing dependencies..."
pnpm install --frozen-lockfile

echo "Step 3: Generating git commit info..."
git_hash=$(git rev-parse HEAD)
git_short_hash=$(git rev-parse --short HEAD)
git_timestamp=$(git log -1 --format=%cd --date=iso)
git_message=$(git log -1 --format=%s)

cat > git-info.json <<EOF
{
  "hash": "$git_hash",
  "shortHash": "$git_short_hash",
  "timestamp": "$git_timestamp",
  "message": "$git_message"
}
EOF

echo "Git info written to git-info.json"

echo "Step 4: Building application..."
step_start=$(date +%s)
pnpm build
step_end=$(date +%s)
echo "Build completed in $((step_end - step_start)) seconds"

echo "Step 5: Starting application..."

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
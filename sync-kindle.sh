#!/bin/bash

# Check if there are any changes
if git diff --exit-code --quiet; then
    echo "No changes to 'My Clippings.txt'. No need to push to GitHub."
else
    git pull

    # Add file to git
    git add My\ Clippings.txt

    # Commit changes
    git commit -m "Updated My Clippings"

    # Push to GitHub
    git push
fi
#!/bin/bash

# Path to the 'My Clippings.txt' file on the Kindle
KINDLE_CLIPPINGS_PATH="/Volumes/Kindle/documents/My Clippings.txt"

# Check if Kindle is connected
if [ -f "$KINDLE_CLIPPINGS_PATH" ]; then
    # Copy 'My Clippings.txt' to the current directory
    sudo cp "$KINDLE_CLIPPINGS_PATH" .

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
else
    echo "Kindle not connected or 'My Clippings.txt' not found."
fi
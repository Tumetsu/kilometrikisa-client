#!/bin/bash

# Generate typedocs to the wiki
npm run typedoc:generate

# Remove <> characters which break Github wiki links
sed -i 's/<internal>/internal/g' wiki/*.md
# Customize the generated API title in sidebar
sed -i 's/\[Exports\]/\[API\]/g' wiki/_Sidebar.md

cd wiki/
cwd wiki/

git init --initial-branch=master
git remote add origin git@github.com:Tumetsu/kilometrikisa-client.wiki.git
git fetch

git add -A
git commit -m "Generate api-reference"

git push -f --set-upstream origin master

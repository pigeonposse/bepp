#!/bin/bash

major_version="v$2"
version="v$1"

# Check if branch v1 exists
if ! git show-ref --verify --quiet "refs/heads/$major_version"; then
	git checkout -b $major_version
fi

# Add content to branch $major_version
git add .
git commit -m ":truck: chore(release): version packages"
git push origin $major_version

create_release() {
    local v="$1"
    # Delete tag if it does exist
    if git rev-parse "$v" >/dev/null 2>&1; then
        git tag -d $v
    fi
    if git ls-remote --tags origin | grep -q "refs/tags/$v"; then
        git push origin :$v
    fi
	#  create tag
	git tag $v
	git push --force origin refs/tags/$v

    local release_name="BEPP action $v"
    local release_body="Release $v"
    
    # Delete release
    if gh release view "$v" >/dev/null 2>&1; then
        gh release delete "$v" --yes >/dev/null 2>&1 || true
    fi

    # Create release
    gh release create "$v" -t "$release_name" -n "$release_body"
	# gh release create "$v" -t "$release_name" -n "$release_body" -F ../packages/gh-action/CHANGELOG.md
} 

create_release "$major_version"
create_release "$version"

git checkout main

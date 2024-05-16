#!/bin/bash
<<comment
Script for blah
 * - Looks for SCSS or PostCSS files in the given directory.
 * - Compiles the files and adds them into a provided collection. 
 * - Takes an array of files for exclusion i.e., if a style file needs to be excluded.
comment

print_usage() {
    echo "Usage: $(basename "$0") -p <directory_path> -e <exclude_files> -c <collection_name>"
}

# Function to make API call which would in turn store the SASS file. 
post_css() {
    filename="$1"
    collection="$2"
    content="$3"

    # Define the rawCss object
    rawCss='{
        "filename": "'"$filename"'",
        "collection": "'"$collection"'",
        "css": "'"$content"'",
        "mode": 1,
        "compiler": "sass"
    }'

    # Make the POST request and capture the response
    response=$(curl -s -X POST \
        -H "Content-Type: application/json" \
        -d "$rawCss" \
        "http://localhost:3009/store")

    # Echo the response
    echo "$response"
}

scss_store() {

    # Check the number of arguments
    if [ "$#" -lt 6 ]; then
        echo "Error: Insufficient arguments."
        print_usage
        exit 1
    fi

    # Initialize variables
    directory_path=""
    exclude_files=()
    collection=""
    # Process command-line arguments
    while [ "$#" -gt 0 ]; do
        case "$1" in
            -p )
                shift
                directory_path="$1"
                ;;
            -c )
                shift
                collection="$1"
                ;;
            -e )
                shift
                exclude_files_string="$1"
                IFS=',' read -r -a exclude_files <<< "$exclude_files_string"
                ;;
            * )
                echo "Invalid option: $1"
                print_usage
                exit 1
                ;;
        esac
        shift
    done    

    # Get the directory of the script
    cd "$(dirname "$0")" || exit
   
    echo $collection
    # Check if directory exists
    if [ ! -d "$directory_path" ]; then
        echo "Directory $directory_path does not exist."
        exit 1
    fi

    # Get list of .scss and .postcss files
    scss_files=$(find "$directory_path" -type f \( -name "*.scss" -o -name "*.postcss" \))

    # Iterate over files
    for file in $scss_files; do
        filename=$(basename "$file")
        if [[ " ${exclude_files[@]} " =~ " ${filename} " ]]; then
            continue
        fi
        content=$(cat "$file")
        content=$(printf '%s' "$content" | tr -d '[:space:]')
        post_css $filename $collection $content
    done
}


scss_store "$@"

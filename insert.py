# script to insert sidebar content in all pages, and removing 
# previous content
import os

def insert_content(source_file, comment_marker, end_comment_marker, file_extension):
    # Read the content from the source file
    with open(source_file, 'r',  errors='ignore') as file:
        source_content = file.read()

    # Get the list of files in the current directory
    files_in_directory = os.listdir()

    # Filter out files with the specified file extension and insert content
    for file_name in files_in_directory:
        if file_name.endswith(file_extension):
            with open(file_name, 'r',  errors='ignore') as file:
                file_content = file.readlines()

            # Find the line numbers where the comment markers are located
            comment_line_number = -1
            end_comment_line_number = -1
            for i, line in enumerate(file_content):
                if comment_marker in line:
                    comment_line_number = i
                elif end_comment_marker in line:
                    end_comment_line_number = i
                    break

            if comment_line_number != -1 and end_comment_line_number != -1:
                updated_content = (
                    ''.join(file_content[:comment_line_number + 1]) +
                    source_content +
                    ''.join(file_content[end_comment_line_number:])
                )

                # Write the updated content back to the file
                with open(file_name, 'w') as file:
                    file.write(updated_content)

# Specify the source file, comment marker, end comment marker, and file extension
source_file = 'sidebar.txt'
comment_marker = '<!-- BEGIN_SIDEBAR -->'
end_comment_marker = '<!-- END_SIDEBAR -->'
file_extension = '.html'

# Call the function to update content in all text files with the specified extension
insert_content(source_file, comment_marker, end_comment_marker, file_extension)

# Specify the source file, comment marker, end comment marker, and file extension
source_file = 'header.txt'
comment_marker = '<!-- BEGIN_HEADER -->'
end_comment_marker = '<!-- END_HEADER -->'
file_extension = '.html'

# Call the function to update content in all text files with the specified extension
insert_content(source_file, comment_marker, end_comment_marker, file_extension)
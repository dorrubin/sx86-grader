# sx86-grader

To unnzip multiple .zip files into separte folders:

$   for file in *.zip
    do
        unzip -d "${file%.zip}" $file
    done



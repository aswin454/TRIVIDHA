@echo off
echo Copying "trividha-guide.pdf" to public folders...

REM Root public folder
if exist "public" (
    copy "trividha-guide.pdf" "public\trividha-guide.pdf" /Y
)

REM Level 1 Client public folder
if exist "client\public" (
    copy "trividha-guide.pdf" "client\public\trividha-guide.pdf" /Y
)

REM Level 2 Client public folder
if exist "client\client\public" (
    copy "trividha-guide.pdf" "client\client\public\trividha-guide.pdf" /Y
)

echo Done! The PDF has been successfully copied.
pause

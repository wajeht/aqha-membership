## move-aqha-membership-pdf-files

This Nodejs scritp will repliacte the process we do for daily 'aqha membership job'. All you have to do it click on 'run.bat' and wait. If error occur check the 'log.txt' file.

## how to use

Within this root folder, there is a file called 'config.json' which stores path to all the 'rubika' folder directory. Make sure to point it to its right directory. Also for production windows and development, change your path regarding what you wanna use.

```json
{
    "production": {
        "OMEGASRV1_ADF_OUTPUT": "C:\\Users\\jawn\\Downloads\\aqha\\Output\\",
        "SPDE_SHARE": "C:\\Users\\jawn\\Downloads\\aqha\\SPDE-SHARE\\",
        "SPDE_SHARE_PDF_OUTPUT": "C:\\Users\\jawn\\Downloads\\aqha\\SPDE-SHARE\\PDF Output\\",
        "CARDS_READY_TO_PRINT": "C:\\Users\\jawn\\Downloads\\aqha\\Cards Ready To Print\\",
        "FILE_EXTENSION": "txt",
        "TO_RENAME": "_R08",
        "LOG_PATH": "C:\\Users\\jawn\\Downloads\\aqha\\Log\\"
    },
    "development": {
        "mac": {
            "OMEGASRV1_ADF_OUTPUT": "/Users/konyein/Downloads/aqha/Output/",
            "SPDE_SHARE": "/Users/konyein/Downloads/aqha/SPDE-SHARE/",
            "SPDE_SHARE_PDF_OUTPUT": "/Users/konyein/Downloads/aqha/SPDE-SHARE/PDF Output/",
            "CARDS_READY_TO_PRINT": "/Users/konyein/Downloads/aqha/Cards Ready To Print/",
            "FILE_EXTENSION": "txt",
            "TO_RENAME": "_R08",
            "LOG_PATH": "/Users/konyein/Downloads/aqha/Log/"
        },
        "windows": {
            "OMEGASRV1_ADF_OUTPUT": "C:\\Users\\jawn\\Downloads\\aqha\\Output\\",
            "SPDE_SHARE": "C:\\Users\\jawn\\Downloads\\aqha\\SPDE-SHARE\\",
            "SPDE_SHARE_PDF_OUTPUT": "C:\\Users\\jawn\\Downloads\\aqha\\SPDE-SHARE\\PDF Output\\",
            "CARDS_READY_TO_PRINT": "C:\\Users\\jawn\\Downloads\\aqha\\Cards Ready To Print\\",
            "FILE_EXTENSION": "txt",
            "TO_RENAME": "_R08",
            "LOG_PATH": "C:\\Users\\jawn\\Downloads\\aqha\\Log\\"
        }
    }
}
```

## adding the script to windows task scheduler

1. open up 'Task Scheduler', you can do that by searching
2. on the menu bar, click on 'Action' and click 'Create Task'
3. inside 'General' tab, if you want cmd to promt when running script you must enable 'Run only when user is logged on', other wise choose 'Run whether use is logged on or not' and click 'Do not store password'
4. Go to 'Trigger' tab, this is where you set up when you want to run the script
5. after setting up trigger, go to 'Action' tab, and click on new.
6. on new action window, choose 'Start a program'
7. witin 'Program/script:' text box, type in the follow command
    ```
    node
    ```
8. within 'Add argument (optional):' text box, point it the script file.

    for example:

    ```
    C:\Users\konyein\Development\aqha-membership\index.js
    ```

9. click ok, you should be good. you can test by running the green play button.

## adding alert when the script runs

1. double click on existing task
2. go to action tab
3. click on new
4. witin 'Program/script' text box, type in the following command

    ```
    CMD
    ```

5. within 'Add argument (optional):' text box, tyep in the follow command

    ```
    /C TITLE              AQHA membership  &ECHO.&ECHO.&ECHO.              AQHA membership file operation is done!       &ECHO.&ECHO.&              TIMEOUT 10
    ```

## license

jawn, VariVerge LLC. 2021

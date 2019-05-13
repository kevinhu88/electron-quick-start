{
    "targets": [
        {
            "target_name": "apns_helper",
            "sources": [],
            "conditions": [
                ["OS=='mac'", {
                    "sources": [
                        "native/apns_helper.mm",
                        "native/QuickStartNotificationCenterDelegate.mm"
                    ],
                    "xcode_settings": {
                        'SDKROOT': 'macosx',
                        'SDK_NAME': 'macosx10.14'
                    },
                    "link_settings": {
                        "libraries": [
                            "$(SDKROOT)/System/Library/Frameworks/UserNotifications.framework"
                        ]
                    }
                }]
            ]
        }
    ]
}

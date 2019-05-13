#include "QuickStartNotificationCenterDelegate.h"

#import <UserNotifications/UNUserNotificationCenter.h>
#import <UserNotifications/UserNotifications.h>

@interface QuickStartNotificationCenterDelegate ()<UNUserNotificationCenterDelegate>
@end

@implementation QuickStartNotificationCenterDelegate

- (instancetype)init {
  if (@available(macOS 10.14, *)) {
    self = [super init];
    if (self != nil) {
      UNUserNotificationCenter* notificationCenter =
          [UNUserNotificationCenter currentNotificationCenter];
      notificationCenter.delegate = self;

      // Define custom actions
      UNNotificationAction* launch_app = [UNNotificationAction
          actionWithIdentifier:@"LAUNCH_APP"
                         title:@"Launch app"
                       options:UNNotificationActionOptionForeground
      ];

      UNNotificationAction* enter_text = [UNTextInputNotificationAction
          actionWithIdentifier:@"ENTER_TEXT"
                         title:@"Enter text"
                       options:UNNotificationActionOptionForeground
          textInputButtonTitle:@"Let's go!"
          textInputPlaceholder:@"placeholder"
      ];

      UNNotificationCategory* category = [UNNotificationCategory
          categoryWithIdentifier:@"CATEGORY_ID"
                         actions:@[ launch_app, enter_text ]
               intentIdentifiers:@[]
                         options:UNNotificationCategoryOptionNone
      ];

      [notificationCenter setNotificationCategories:[NSSet setWithArray:@[
                            category,
                          ]]];
    }
    return self;
  } else {
    return nil;
  }
}

+ (BOOL)isSupported {
  if (@available(macOS 10.14, *)) {
    return YES;
  }
  return NO;
}

@end

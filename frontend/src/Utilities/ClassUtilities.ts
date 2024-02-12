import { Store } from 'react-notifications-component';
import config from "../config";

class ClassUtilities {
  static convert2FormData(arr: Record<string, any>[]): FormData {
    const formData = new FormData();

    arr.forEach((obj) => {
      for (const [key, val] of Object.entries(obj)) {
        let fieldName: string;

        if (Array.isArray(val)) {
          val.forEach((item, index) => {
            fieldName = `${key}[${index}]`;
            formData.append(fieldName, item);
          });
        } else {
          fieldName = key;
          formData.append(fieldName, val);
        }
      }
    });

    return formData;
  }

  static filterNullAndEmptyStrings(
    arr: Record<string, any>[]
  ): Record<string, any>[] {
    return arr.map((obj) => {
      const filteredObj: Record<string, any> = {};

      for (const [key, value] of Object.entries(obj)) {
        if (value !== null && value !== "") {
          filteredObj[key] = value;
        }
      }

      return filteredObj;
    });
  }

  static triggerNotification(store: typeof Store, notification: any)  {
    store.addNotification({
      ...config.notificationConfig,
      ...notification,
    });
  }
}

export default ClassUtilities;

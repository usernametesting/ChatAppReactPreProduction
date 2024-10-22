
import alertify from 'alertifyjs';
class AlertifyService {
  success(Message: string, delay: number = 1): void {
    alertify.dismissAll();
    alertify.success(Message, delay);
  }

  error(Message: string, delay: number = 1): void {
    alertify.dismissAll();
    alertify.error(Message, delay);
  }

  warning(Message: string, delay: number = 1): void {
    alertify.dismissAll();
    alertify.warning(Message, delay);
  }

  Message(Message: string, delay: number = 1): void {
    alertify.dismissAll();
    alertify.Message(Message, delay );
  }

  confirm(Message: string, onConfirm: () => void, onCancel: () => void = () => {}): void {
    alertify.confirm(Message, function () {
      onConfirm();
    }, function () {
      onCancel();
    });
  }
}

export const alertifyService = new AlertifyService();

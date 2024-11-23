// services/NotificationService.js
import * as Notifications from 'expo-notifications';

export const configurePushNotifications = async () => {
  // Solicitar permissão para receber notificações
  const { status } = await Notifications.requestPermissionsAsync();

  if (status !== 'granted') {
    console.log('Permissão de notificações não concedida!');
    // Você pode adicionar uma lógica aqui para informar o usuário ou solicitar permissão novamente
    return;
  }

  // Configuração da notificação
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

  console.log('Permissão de notificações concedida!');
};

// Função para agendar notificações
export const scheduleNotification = async (title, body, trigger) => {
  try {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: title,
        body: body,
      },
      trigger: trigger,
    });
    console.log('Notificação agendada com sucesso!');
  } catch (error) {
    console.error('Erro ao agendar notificação:', error);
  }
};

// Função para verificar o status da permissão de notificações
export const checkNotificationPermission = async () => {
  const { status } = await Notifications.getPermissionsAsync();
  if (status === 'granted') {
    console.log('Permissão de notificações já concedida');
  } else {
    console.log('Permissão de notificações não concedida');
  }
};

// Função para cancelar todas as notificações agendadas
export const cancelAllNotifications = async () => {
  try {
    await Notifications.cancelAllScheduledNotificationsAsync();
    console.log('Todas as notificações canceladas!');
  } catch (error) {
    console.error('Erro ao cancelar notificações:', error);
  }
};

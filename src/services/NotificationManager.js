import PushNotification from "react-native-push-notification";

class NotificationManager {

    setNavigation = (novoNavegador) => {
        navegador = novoNavegador;
    }

    // Configuração orientada pela documentação do React Native Push Notification
    // Essa configuração garante o funcionamento da biblioteca no Android e no iOS
    configure = () => {
        PushNotification.configure({
            onRegister: function (token) {
                console.log("[NotificationManager] onRegister token:", token);
            },
            onNotification: function (notification) {
                console.log("[NotificationManager] onNotification:", notification);
                //navegador.navigate("Lista Diária");
            },
        })
    }

    // É aqui que nossa notificação para o Android é construida
    buildAndroidNotification = (id, title, message, data = {}, options = {}) => {
        return {
            channelId: "my-channel",
            id: id,
            autoCancel: true,
            largeIcon: options.largeIcon || "ic_launcher",
            smallIcon: options.smallIcon || "ic_launcher",
            bigText: message || '',
            subText: title || '',
            vibrate: options.vibrate || false,
            vibration: options.vibration || 300,
            priority: options.priority || "high",
            importance: options.importance || "high",
            data: data
        }
    }

    // Fução que exibe a notificação
    showNotification = (id, title, message, data = {}, options = {}) => {
        PushNotification.localNotification({
            /* Propriedades do Android */
            ...this.buildAndroidNotification(id, title, message, data, options),

            /* Propriedades do Android e iOS */
            title: title || "",
            message: message || "",
            playSound: options.playSound || false,
            soundName: options.soundName || 'default',
            userInteraction: false
        })
    }

    // Função que cancela todas notiificações e limpa as que estão no centro de notificações
    cancelAllLocalNotification = () => {
        PushNotification.cancelAllLocalNotifications();
    }

    cancelOneLocalNotification = (id) => {
        PushNotification.cancelLocalNotification(id);
    }

    createChannel = () => {
        PushNotification.createChannel(
            {
                channelId: "my-channel", // (required)
                channelName: "My channel", // (required)
                channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
            },
            (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
        );
    }

    scheduleNotification = (id, nome, horaCompleta) => {

        PushNotification.localNotificationSchedule({
            //... You can use all the options from localNotifications
            id: id,
            title: "Aviso de término de tarefa.",
            message: "Parece que acabou o tempo pra realizar a tarefa: " + nome, // EXEMPLOOOOO
            date: new Date(horaCompleta), // primeira notificação
            allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
            channelId: "my-channel" // (required)
        }
        );
    }

    cancelNotif() {
        PushNotification.cancelLocalNotification(this.lastId);
    }

}

export const notificationManager = new NotificationManager(); // erro de uma atividade da UC12, importação com "{}" por ser "const"
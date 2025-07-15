/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ToastAndroid, Alert, Platform, Linking, Dimensions } from 'react-native';

// Bibliotecas
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import MyIcon from 'react-native-vector-icons/MaterialIcons';
import PushNotification from 'react-native-push-notification';
import * as Progress from 'react-native-progress';

// Páginas e Serviços
import { notificationManager } from '../services/NotificationManager';
import ListagemRec from './ListagemRec';
import Database from '../databaseS/database';
import { listaDeTarefas } from '../styles/index';

const notificador = notificationManager;
const SLIDER_WIDTH = Dimensions.get('window').width;

class Listagem extends Component {

    // States
    constructor(props) {
        super(props);
        this.state = {
            numeroConcluidas: parseFloat(),
            numero: parseFloat(),
            id: '',
            nome: '',
            descricao: '',
            prioridade: '',
            horaCompleta: new Date(),
            horaFormatada: '',
            concluido: '',
            notifId: '',
            lista: [],
        };

        this.Listagens();
        this.ListaTarefas();
        this.ListaConcluidas();
        notificador.configure();
        notificador.createChannel();
    }

    // Lidar com a permissão de alarme exato
    openExactAlarmSettings = () => {
        if (Platform.OS === 'android' && Platform.Version >= 31) {
            Alert.alert(
                "Permissão de Alarme Necessária",
                "Para agendar lembretes precisos, por favor, habilite a permissão 'Alarmes e Lembretes' nas configurações do aplicativo. Você será redirecionado para as configurações.",
                [
                    { text: "Cancelar", style: "cancel" },
                    { text: "Abrir Configurações", onPress: () => Linking.openSettings() }
                ]
            );
        } else {
            // Para Android < 12, a permissão é geralmente concedida na instalação ou não requer interação.
            ToastAndroid.show("A permissão de alarme é geralmente concedida por padrão em sua versão do Android.", ToastAndroid.LONG);
        }
    };

    // Funções anõnimas para chamada dos métodos das Tarefas
    TestarConexao = () => {
        const db = new Database();
        db.Conectar();
        this.Listagens();
    };

    Listagens = () => {
        const db = new Database();
        db.Listar().then(data => {
            this.setState({ lista: data });
        });
    }

    ListaTarefas = () => {
        const db = new Database();
        db.ListarQuantidade().then(data => {
            this.setState({ numero: data });
        });
    }

    ListaConcluidas = () => {
        const db = new Database();
        db.ListarConcluidas().then(data => {
            this.setState({ numeroConcluidas: data });
        });
    }

    Delete = (id) => {
        const db = new Database();
        notificador.cancelOneLocalNotification(id);
        db.Deletar(id);
        this.Listagens();
        this.ListaConcluidas();
        this.ListaTarefas();
    }

    Concluir = (id) => {
        const db = new Database();
        db.EdicaoConcluido(id);
        this.Listagens();
        this.ListaConcluidas();
    }

    // Função para a criação de notificação agendada para a tarefa específica
    LembreteNotificacao = async (id, nome, horaCompleta, notifIdParam) => {
        console.log(`LembreteNotificacao - notifIdParam (original): ${notifIdParam}, Tipo: ${typeof notifIdParam}`);
        const notifId = Number(notifIdParam);
        console.log(`LembreteNotificacao - notifId (convertido): ${notifId}, Tipo: ${typeof notifId}`);

        const agora = new Date();
        const horaMarcada = new Date(horaCompleta);

        if (notifId === 0) {
            console.log("Entrou AQUI")
            if (horaMarcada > agora) {
                console.log("Entrou NO SEGUNDO")
                const hasNotificationPermissions = await new Promise(resolve => {
                    console.log("Entrou NO TERCEIRO (antes de checkPermissions)");
                    PushNotification.checkPermissions(permissions => {
                        console.log("Entrou NO QUINTO (dentro do callback de checkPermissions)");
                        console.log("Permissões recebidas:", permissions);

                        if (permissions.alert === false) {
                            console.log("Deu ruim - Permissão de alerta é false");
                            resolve(false);
                        } else {
                            console.log("Deu bom - Permissão de alerta é true ou não aplicável");
                            resolve(true);
                        }
                    });
                });

                if (!hasNotificationPermissions) {
                    this.openExactAlarmSettings();
                    ToastAndroid.show("Não é possível agendar lembrete sem permissão de notificação.", ToastAndroid.LONG);
                    return;
                }

                try {
                    await notificador.scheduleNotification(id, nome, horaCompleta);
                    ToastAndroid.show("Lembrete Agendado!", ToastAndroid.SHORT);

                    const db = new Database();
                    await db.EdicaoCriarNotif(id);
                    this.Listagens();
                } catch (error) {
                    console.error("Erro ao agendar notificação:", error);
                    ToastAndroid.show("Erro ao agendar lembrete. Tente novamente.", ToastAndroid.LONG);
                }
            } else {
                ToastAndroid.show("Você não pode marcar uma notificação para um horário passado!", ToastAndroid.SHORT);
            }
        } else {
            ToastAndroid.show("Lembrete já existe!", ToastAndroid.SHORT);
        }
    }

    CancelNotification = (id, notifIdParam) => {
        console.log(`CancelNotification - notifIdParam (original): ${notifIdParam}, Tipo: ${typeof notifIdParam}`);
        const notifId = Number(notifIdParam);
        console.log(`CancelNotification - notifId (convertido): ${notifId}, Tipo: ${typeof notifId}`);
        if (notifId === 1) {
            
            notificador.cancelOneLocalNotification(id);
            ToastAndroid.show("Notificação Cancelada!", ToastAndroid.SHORT);

            const db = new Database();
            db.EdicaoCancelNotif(id);
            this.Listagens();
        } else {
            ToastAndroid.show("Não há notificações para esta tarefa.", ToastAndroid.SHORT);
        }
    }

    render() {

        var resultado = (this.state.numeroConcluidas / this.state.numero);

        var valida = Number.isFinite(resultado) ? resultado : 0;

        const { navegacao } = this.props;

        return (
            <View>
                <Text style={listaDeTarefas.titulo}>Listagem de Tarefas:</Text>
                <View style={listaDeTarefas.viewBarraDeProgresso}>
                    <Progress.Bar progress={valida} width={SLIDER_WIDTH * 0.7} height={8} animationType='timing' color='#02c702' borderWidth={2} />
                </View>
                {
                    this.state.lista.map(
                        item => {
                            console.log(`Tarefa ID: ${item.id}, notifId na renderização: ${item.notifId}`);
                            return (
                                <View key={item.id} style={listaDeTarefas.viewLista}>
                                    <Text style={listaDeTarefas.textLista}>Nome da Tarefa: {item.nome}</Text>
                                    <Text style={listaDeTarefas.textLista}>Descrição: {item.descricao}</Text>
                                    <Text style={listaDeTarefas.textLista}>Prioridade: {item.prioridade}</Text>
                                    <Text style={listaDeTarefas.textLista}>Horário de Término: {item.horaFormatada}</Text>
                                    <Text style={listaDeTarefas.textLista}>Status: {item.concluido}</Text>
                                    <View style={listaDeTarefas.viewBtn}>
                                        <TouchableOpacity style={listaDeTarefas.btnConcluido} onPress={() => this.Concluir(item.id)}>
                                            <Icon name="checkmark-sharp" size={30} color="#ffffff" />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={listaDeTarefas.btnEditar}
                                            onPress={() => navegacao.navigate('Editar Tarefa', {
                                                id: item.id,
                                                nome: item.nome,
                                                descricao: item.descricao,
                                                prioridade: item.prioridade,
                                                horaCompleta: item.horaCompleta,
                                                concluido: item.concluido,
                                                notifId: item.notifId,
                                            })}
                                        >
                                            <MyIcon name="edit" size={30} color="#ffffff" />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={listaDeTarefas.btnExcluir} onPress={() => this.Delete(item.id)}>
                                            <Icon name="trash" size={30} color="#ffffff" />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={listaDeTarefas.btnNotificacoes} onPress={() => this.LembreteNotificacao(item.id, item.nome, item.horaCompleta, item.notifId)}>
                                            <Icon name="notifications" size={30} color="#ffffff" />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={listaDeTarefas.btnCancelNotif} onPress={() => this.CancelNotification(item.id, item.notifId)}>
                                            <Icon name="notifications-off" size={30} color="#ffffff" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )
                        }
                    )
                }
            </View>
        );
    }
}

export default function ListaFunction(props) {
    const navigation = useNavigation();

    return <ScrollView><Listagem {...props} navegacao={navigation} /><ListagemRec {...props} navegacao={navigation} /></ScrollView>;
}

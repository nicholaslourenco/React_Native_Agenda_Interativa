/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, TouchableOpacity, ScrollView, Button, ToastAndroid } from 'react-native';

// Bibliotecas
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Páginas e Serviços
import { notificationManager } from '../services/NotificationManager';
import { forms } from '../styles';
import Database from '../databaseS/database';
import Tarefa from '../models/tarefa';

const db = new Database();

export default function EditTarefa({ route, navigation }) {

    // States
    const [id, setId] = useState('');
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [prioridade, setPrioridade] = useState('');
    const [horaCompleta, setHoraCompleta] = useState();
    const [concluido, setConcluido] = useState('');
    const [notifId, setNotifId] = useState('');
    const [showPicker, setShowPicker] = useState(false);

    // Constante para chamar notificationManager e alterar notificações
    const notificador = notificationManager;

    // Atualizando os States
    useEffect(() => {
        setId(route.params.id);
        setNome(route.params.nome);
        setDescricao(route.params.descricao);
        setPrioridade(route.params.prioridade);
        setHoraCompleta(new Date(route.params.horaCompleta));
        setConcluido(route.params.concluido);
        setNotifId(route.params.notifId);
    }, []);

    // Função para mostrar o seletor de hora após o toque
    const showMode = () => {
        if (Platform.OS === 'android') {
            setShowPicker(true);
            // for iOS, add a button that closes the picker
        }
    };

    // Função de atualização de hora
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShowPicker(false);
        setHoraCompleta(currentDate);
    };

    // Função para atualizar uma notificação, será chamada no método "editar" caso
    // a hora tenha sido alterada e a notificação tiver sido ativada
    const lembreteNotificacao = (id, nome, horaCompleta) => {
        // Apaga e cria outra notificação com o horário novo
        notificador.cancelOneLocalNotification(id);
        notificador.scheduleNotification(id, nome, horaCompleta);
    }

    // Método para edição de Tarefas
    let editar = (id, nome, descricao, prioridade, horaCompleta, concluido, notifId) => {
        // Iguala a zero segundos e milisegundos de "horaCompleta" para que as notificações
        // sejam lançadas na virada exata dos minutos
        horaCompleta.setSeconds(0, 0);

        // Formata a data para mostrar ao usuário
        const horaFormatada = new Intl.DateTimeFormat('pt-br', {
            hour: 'numeric',
            minute: 'numeric'
        }).format(horaCompleta);

        // Edição da Tarefa
        const tarefaEditada = new Tarefa(nome, descricao, prioridade, horaCompleta, horaFormatada, concluido, notifId);
        db.Edicao(id, tarefaEditada);
        
        console.log("------------> Completa " + typeof horaCompleta + horaCompleta);

        // if/else Para o caso de a hora não ser mudada, ou as notificações não terem sido ativadas pelo usuário
        if (notifId == 1) {
            if (horaCompleta != route.params.horaCompleta) {
                lembreteNotificacao(id, nome, horaCompleta);
            }
        }
        ToastAndroid.show("Tarefa editada com sucesso", ToastAndroid.SHORT);
        navigation.navigate('Home');
    }

    return (
        <ScrollView>
            <Text style={forms.titulo}>Edição de Tarefa</Text>
            <Text />
            <Text style={forms.text}>Nome da Tarefa</Text>
            <TextInput
                style={forms.textInputTar}
                value={nome}
                onChangeText={
                    (text) => setNome(text)
                }
            />
            <Text />
            <Text style={forms.text}>Descrição da Tarefa</Text>
            <TextInput
                style={forms.textInputTar}
                value={descricao}
                onChangeText={
                    (text) => setDescricao(text)
                }
                multiline={true}
                numberOfLines={4}
            />
            <Text />
            <Text style={forms.text}>Prioridade</Text>
            <TextInput
                style={forms.textInputTar}
                value={prioridade}
                onChangeText={
                    (text) => setPrioridade(text)
                }
            />
            <Text />
            <Text style={forms.text}>Horário de Término da Tarefa</Text>
            <View style={forms.viewBtn}>
                <TouchableOpacity style={forms.btnRelogio} onPress={showMode}>
                    <Icon name="clock" size={70} color="#ffffff" />
                </TouchableOpacity>
            </View>
            {showPicker && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={new Date()}
                    mode='time'
                    onChange={onChange}
                />
            )}
            <Text />
            <TouchableOpacity
                style={forms.btnCadTarefas}
                onPress={() => editar(
                    id,
                    nome,
                    descricao,
                    prioridade,
                    horaCompleta,
                    concluido,
                    notifId
                )
                }
            >
                <Text style={forms.btnTarefasText}>Editar Tarefa</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}


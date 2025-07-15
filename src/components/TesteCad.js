/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { Text, ScrollView, TextInput, TouchableOpacity, ToastAndroid, View } from 'react-native';

// Bibliotecas
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Páginas e Serviços
import { forms } from '../styles';
import Database from '../databaseS/database';
import Tarefa from '../models/tarefa';


class Teste12 extends Component {

    // States
    constructor(props) {
        super(props);
        this.state = {
            nome: '',
            descricao: '',
            prioridade: '',
            horaCompleta: new Date(),
            concluido: '',
            notifId: 0,
            showPicker: false
        };

        this.TestarConexao();
    }

    // Funções anõnimas para chamada dos métodos das Tarefas
    TestarConexao = () => {
        const db = new Database();
        db.Conectar();
    };

    Cadastrar = (nome, descricao, prioridade, horaCompleta, concluido, notifId) => {
        horaCompleta.setSeconds(0, 0);
        const horaFormatada = new Intl.DateTimeFormat('pt-br', {
            hour: 'numeric',
            minute: 'numeric'
        }).format(horaCompleta);
        console.log(horaFormatada);
        const { navegacao } = this.props;
        const db = new Database();
        const novaTarefa = new Tarefa(nome, descricao, prioridade, horaCompleta, horaFormatada, concluido, notifId);
        db.Adicionar(novaTarefa);
        ToastAndroid.show("Tarefa adicionada!", ToastAndroid.SHORT);
        navegacao.navigate('Home');
    };

    // Função para mostrar o seletor de hora após o toque
    ShowMode = () => {
        if (Platform.OS === 'android') {
            this.setState({ showPicker: true });
            // for iOS, add a button that closes the picker
        }
    };

    // Função de seleção de hora
    OnChange = (event, selectedDate) => {
        this.setState({ showPicker: false });
        this.setState({ horaCompleta: selectedDate });
    };

    render() {
        const showPicker = this.state.showPicker;

        return (
            <ScrollView>
                <Text style={forms.titulo}>Cadastrar Tarefa:</Text>
                <Text />
                <Text style={forms.text}>Nome da Tarefa</Text>
                <TextInput
                    style={forms.textInputTar}
                    onChangeText={textoDigitado =>
                        this.setState({ nome: textoDigitado })
                    }
                />
                <Text />
                <Text style={forms.text}>Descrição da Tarefa</Text>
                <TextInput
                    style={forms.textInputTar}
                    onChangeText={textoDigitado =>
                        this.setState({ descricao: textoDigitado })
                    }
                    multiline={true}
                    numberOfLines={4}
                />
                <Text />
                <Text style={forms.text}>Prioridade</Text>
                <TextInput
                    style={forms.textInputTar}
                    onChangeText={textoDigitado =>
                        this.setState({ prioridade: textoDigitado })
                    }
                />
                <Text />
                <Text style={forms.text}>Horário de Término da Tarefa</Text>
                <Text style={forms.text}>Horário Selecionado: {this.state.horaCompleta.toLocaleTimeString('pt-br', {hour: '2-digit', minute: '2-digit', hour12: false})}</Text>
                <View style={forms.viewBtn}>
                    <TouchableOpacity style={forms.btnRelogio} onPress={() => this.ShowMode()}>
                        <Icon name="clock" size={70} color="#ffffff" />
                    </TouchableOpacity>
                </View>
                {/*<Button onPress={() => this.ShowMode()} title="Selecionar Horário de Término" />*/}
                {showPicker && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={new Date()}
                        mode='time'
                        onChange={this.OnChange}
                    />
                )}
                <Text />
                <TouchableOpacity
                    style={forms.btnCadTarefas}
                    onPress={() => {
                        this.Cadastrar(
                            this.state.nome,
                            this.state.descricao,
                            this.state.prioridade,
                            this.state.horaCompleta,
                            this.state.concluido,
                            this.state.notifId
                        );
                    }}
                >
                    <Text style={forms.btnTarefasText}>Cadastrar</Text>
                </TouchableOpacity>
            </ScrollView>
        );
    }

}

export default function Teste(props) {
    const navigation = useNavigation();

    return <ScrollView><Teste12 {...props} navegacao={navigation} /></ScrollView>;
}

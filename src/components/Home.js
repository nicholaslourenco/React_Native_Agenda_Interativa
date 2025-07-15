/* eslint-disable prettier/prettier */
import React, {useEffect} from 'react';
import { Text, ScrollView, TouchableOpacity, Image, TouchableHighlight, PermissionsAndroid } from 'react-native';

// Páginas e Serviços
import { home } from '../styles';

export default function Home({ navigation }) {

  return (
    <ScrollView>
      <Image style={home.image} source={require('../images/logoGerenciador.png')} />
      <Text />
      <Text style={home.titulo}>Agenda Interativa</Text>
      <Text />
      <TouchableHighlight underlayColor="#d6e9ff" style={home.btnTarefas} onPress={() => navigation.navigate('Cadastro de Tarefa')}>
        <Text style={home.btnTarefasText}>Cadastrar Tarefas</Text>
      </TouchableHighlight>
      <TouchableHighlight underlayColor="#edd6ff" style={home.btnRecompensas} onPress={() => navigation.navigate('Cadastro de Recompensa')}>
        <Text style={home.btnRecompensasText}>Cadastrar Recompensas</Text>
      </TouchableHighlight>
      <TouchableHighlight underlayColor="#cffccf" style={home.btnLista} onPress={() => navigation.navigate('Lista Diária')}>
        <Text style={home.btnListaText}>Lista Diária</Text>
      </TouchableHighlight>
    </ScrollView>
  );
}

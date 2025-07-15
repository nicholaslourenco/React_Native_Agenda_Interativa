/* eslint-disable prettier/prettier */
/* eslint-disable eol-last */
/* eslint-disable quotes */
import { StyleSheet, Dimensions } from "react-native";
const SLIDER_WIDTH = Dimensions.get('window').width;
const SLIDER_HEIGHT = Dimensions.get('window').height;
const ITEM_WIDTH = SLIDER_WIDTH * 0.88;



/*let widthDetalhes = null;
let heightDetalhes = null;

if (SLIDER_HEIGHT > SLIDER_WIDTH) {
    widthDetalhes = SLIDER_WIDTH * 0.5;
    heightDetalhes = SLIDER_HEIGHT * 0.5;
} else if (SLIDER_HEIGHT < SLIDER_WIDTH) {
    widthDetalhes = SLIDER_WIDTH * 0.25;
    heightDetalhes = SLIDER_HEIGHT * 0.7;
}*/

const home = StyleSheet.create({
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
        alignSelf: 'center'
    },
    image: {
        alignSelf: 'center',
        width: 170,
        height: 170,
        marginTop: 15,
    },
    btnTarefas: {
        borderWidth: 3,
        borderColor: '#65ADFF',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        margin: 10,
    },
    btnTarefasText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#65ADFF',
        margin: 7,
    },
    btnRecompensas: {
        borderWidth: 3,
        borderColor: '#C16FFF',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        margin: 10,
    },
    btnRecompensasText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#C16FFF',
        margin: 7,
    },
    btnLista: {
        borderWidth: 3,
        borderColor: '#02c702',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        margin: 10,
    },
    btnListaText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#02c702',
        margin: 7,
    },
});

const forms = StyleSheet.create({
    textInputTar: {
        width: 250,
        borderWidth: 2,
        borderColor: '#65ADFF',
        borderRadius: 7,
        alignSelf: 'center',
        fontSize: 18,
    },
    btnCadTarefas: {
        backgroundColor: '#65ADFF',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 10,
        borderRadius: 2,
        marginBottom: 10,
    },
    btnTarefasText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ffffff',
        margin: 7,
    },
    textInputRec: {
        width: 250,
        borderWidth: 2,
        borderColor: '#C16FFF',
        borderRadius: 7,
        alignSelf: 'center',
        fontSize: 18,
    },
    btnCadRecompensas: {
        backgroundColor: '#C16FFF',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 10,
    },
    btnRecompensasText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ffffff',
        margin: 7,
    },
    btnRelogio: {
        width: 85,
        height: 85,
        backgroundColor: '#65ADFF',
        borderRadius: 85,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },
    viewBtn: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 20,
        color: '#000',
        alignSelf: 'center',
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
        alignSelf: 'center',
        marginTop: 5
    },
});

const listaDeTarefas = StyleSheet.create({
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
        alignSelf: 'center',
        marginTop: 5
    },
    viewLista: {
        width: ITEM_WIDTH,
        borderColor: '#65ADFF',
        borderWidth: 4,
        justifyContent: 'center',
        borderRadius: 10,
        marginBottom: 10,
        marginTop: 10,
        alignSelf: 'center',
    },
    barraDeProgresso: {
        borderRadius: 15,
        alignSelf: 'center'
    },
    viewBarraDeProgresso: {
        width: SLIDER_WIDTH * 0.7,
        alignSelf: 'center',
        margin: 15,
    },
    textLista: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#65ADFF',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5,
    },
    viewBtn: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnConcluido: {
        width: 40,
        height: 40,
        backgroundColor: '#02c702',
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },
    btnExcluir: {
        width: 40,
        height: 40,
        backgroundColor: '#ff4747',
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },
    btnNotificacoes: {
        width: 40,
        height: 40,
        backgroundColor: '#65ADFF',
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },
    btnCancelNotif: {
        width: 40,
        height: 40,
        backgroundColor: '#ff4747',
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },
    btnEditar: {
        width: 40,
        height: 40,
        backgroundColor: '#6410BA',
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },
    btnText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffff',
        margin: 5,
        alignSelf: 'center',
    },
});

const listaDeRecompensas = StyleSheet.create({
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
        alignSelf: 'center',
        marginTop: 5
    },
    viewLista: {
        width: ITEM_WIDTH,
        borderColor: '#C16FFF',
        borderWidth: 4,
        justifyContent: 'center',
        borderRadius: 10,
        marginBottom: 10,
        marginTop: 10,
        alignSelf: 'center',
    },
    textLista: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#C16FFF',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5,
    },
    viewBtn: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnExcluir: {
        width: 40,
        height: 40,
        backgroundColor: '#ff4747',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },
    btnEditar: {
        width: 40,
        height: 40,
        backgroundColor: '#6410BA',
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },
    btnText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ffffff',
        margin: 5,
        alignSelf: 'center',
    },
});

export {forms, home, listaDeTarefas, listaDeRecompensas};
/* eslint-disable prettier/prettier */
export default class Tarefa {
    constructor(nome, descricao, prioridade, horaCompleta, horaFormatada, concluido, notifId) {
        this.nome = nome;
        this.descricao = descricao;
        this.prioridade = prioridade;
        this.horaCompleta = horaCompleta;
        this.horaFormatada = horaFormatada;
        this.concluido = concluido;
        this.notifId = notifId;
    }
}

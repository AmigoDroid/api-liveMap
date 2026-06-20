export default function associate(models) {

    // =========================
    // PROVEDOR / USUÁRIOS
    // =========================

    models.Provedor.hasMany(models.Usuario, {
        foreignKey: "provedorId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    });

    models.Usuario.belongsTo(models.Provedor, {
        foreignKey: "provedorId"
    });

    models.Provedor.hasMany(models.Cliente, {
        foreignKey: "provedorId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    });

    models.Cliente.belongsTo(models.Provedor, {
        foreignKey: "provedorId"
    });

    models.Cliente.hasMany(models.Endereco, {
        foreignKey: "clienteId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    });

    models.Endereco.belongsTo(models.Cliente, {
        foreignKey: "clienteId"
    });

    models.Cliente.hasMany(models.Contrato, {
        foreignKey: "clienteId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    });

    models.Contrato.belongsTo(models.Cliente, {
        foreignKey: "clienteId"
    });

    models.Contrato.hasMany(models.Servico, {
        foreignKey: "contratoId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    });

    models.Servico.belongsTo(models.Contrato, {
        foreignKey: "contratoId"
    });

    // =========================
    // INFRA ESTRUTURA POP / CORE
    // =========================

    models.Pop.hasMany(models.Rack, {
        foreignKey: "popId",
        onDelete: "CASCADE"
    });

    models.Rack.belongsTo(models.Pop, {
        foreignKey: "popId"
    });

    models.Pop.hasMany(models.Olt, {
        foreignKey: "popId",
        onDelete: "CASCADE"
    });

    models.Olt.belongsTo(models.Pop, {
        foreignKey: "popId"
    });

    models.Rack.hasMany(models.Olt, {
        foreignKey: "rackId"
    });

    models.Olt.belongsTo(models.Rack, {
        foreignKey: "rackId"
    });

    models.Olt.hasMany(models.CartaoOlt, {
        foreignKey: "oltId",
        onDelete: "CASCADE"
    });

    models.CartaoOlt.belongsTo(models.Olt, {
        foreignKey: "oltId"
    });

    models.CartaoOlt.hasMany(models.PortaPon, {
        foreignKey: "cartaoOltId"
    });

    models.PortaPon.belongsTo(models.CartaoOlt, {
        foreignKey: "cartaoOltId"
    });

    models.Pop.hasMany(models.Dio, {
        foreignKey: "popId"
    });

    models.Dio.belongsTo(models.Pop, {
        foreignKey: "popId"
    });

    models.Rack.hasMany(models.Dio, {
        foreignKey: "rackId"
    });

    models.Dio.belongsTo(models.Rack, {
        foreignKey: "rackId"
    });

    models.Dio.hasMany(models.PortaDio, {
        foreignKey: "dioId"
    });

    models.PortaDio.belongsTo(models.Dio, {
        foreignKey: "dioId"
    });

    models.Pop.hasMany(models.Equipamento, {
        foreignKey: "popId"
    });

    models.Equipamento.belongsTo(models.Pop, {
        foreignKey: "popId"
    });

    // =========================
    // REDE ÓPTICA (FTTH CORE)
    // =========================

    models.Projeto.hasMany(models.Cabo, {
        foreignKey: "projetoId"
    });

    models.Cabo.belongsTo(models.Projeto, {
        foreignKey: "projetoId"
    });

    models.Cabo.hasMany(models.Tubo, {
        foreignKey: "caboId"
    });

    models.Tubo.belongsTo(models.Cabo, {
        foreignKey: "caboId"
    });

    models.Tubo.hasMany(models.Fibra, {
        foreignKey: "tuboId"
    });

    models.Fibra.belongsTo(models.Tubo, {
        foreignKey: "tuboId"
    });

    models.Cabo.hasMany(models.ReservaTecnica, {
        foreignKey: "caboId"
    });

    models.ReservaTecnica.belongsTo(models.Cabo, {
        foreignKey: "caboId"
    });

    models.Cabo.hasMany(models.PontoCabo, {
        foreignKey: "caboId"
    });

    models.PontoCabo.belongsTo(models.Cabo, {
        foreignKey: "caboId"
    });

    models.CaixaEmenda.hasMany(models.PortaCaixa, {
        foreignKey: "caixaEmendaId"
    });

    models.PortaCaixa.belongsTo(models.CaixaEmenda, {
        foreignKey: "caixaEmendaId"
    });

    models.CaixaEmenda.hasMany(models.Fusao, {
        foreignKey: "caixaEmendaId"
    });

    models.Fusao.belongsTo(models.CaixaEmenda, {
        foreignKey: "caixaEmendaId"
    });

    // =========================
    // ACESSO (DISTRIBUIÇÃO FINAL)
    // =========================

    models.Splitter.hasMany(models.PortaSplitter, {
        foreignKey: "splitterId"
    });

    models.PortaSplitter.belongsTo(models.Splitter, {
        foreignKey: "splitterId"
    });

    models.CTO.hasMany(models.PortaCTO, {
        foreignKey: "ctoId"
    });

    models.PortaCTO.belongsTo(models.CTO, {
        foreignKey: "ctoId"
    });

    models.Cliente.hasOne(models.ONU, {
        foreignKey: "clienteId"
    });

    models.ONU.belongsTo(models.Cliente, {
        foreignKey: "clienteId"
    });

    models.Cliente.hasOne(models.AtendimentoFTTH, {
        foreignKey: "clienteId"
    });

    models.AtendimentoFTTH.belongsTo(models.Cliente, {
        foreignKey: "clienteId"
    });

    models.ONU.hasOne(models.AtendimentoFTTH, {
        foreignKey: "onuId"
    });

    models.AtendimentoFTTH.belongsTo(models.ONU, {
        foreignKey: "onuId"
    });

    models.PortaCTO.hasOne(models.AtendimentoFTTH, {
        foreignKey: "portaCtoId"
    });

    models.AtendimentoFTTH.belongsTo(models.PortaCTO, {
        foreignKey: "portaCtoId"
    });

    models.PortaPon.hasMany(models.AtendimentoFTTH, {
        foreignKey: "portaPonId"
    });

    models.AtendimentoFTTH.belongsTo(models.PortaPon, {
        foreignKey: "portaPonId"
    });
}
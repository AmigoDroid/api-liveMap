// Lista mestra de todas as permissões disponíveis no sistema
export const PERMISSOES = {
    // Admin geral do provedor
    ADMIN: "ADMIN",

    // Mapa
    VER_MAPA: "VER_MAPA",
    EDITAR_MAPA: "EDITAR_MAPA",

    // Rede
    VER_REDE: "VER_REDE",
    EDITAR_REDE: "EDITAR_REDE",

    // Clientes
    VER_CLIENTES: "VER_CLIENTES",
    EDITAR_CLIENTES: "EDITAR_CLIENTES",

    // Incidentes
    VER_INCIDENTES: "VER_INCIDENTES",
    GERENCIAR_INCIDENTES: "GERENCIAR_INCIDENTES",

    // Usuários
    GERENCIAR_USUARIOS: "GERENCIAR_USUARIOS",
};

export const PERMISSOES_ADMIN_PADRAO = Object.values(PERMISSOES);

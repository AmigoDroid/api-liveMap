import { UPDATE } from "sequelize/lib/query-types";

const provedorX = {
    nome:"Fabreu Telecom",
    descrition:"Provedor de internet e telefonia",
    cpfcnpj:"123.456.789-00",
    endereco:"Rua das Flores, 123",
    telefone:"(11) 98765-4321",
    email:"fabreutelecom@fabreu.com.br",
    password:"mudar@fabreu123",
    licensa:"licenced-123456-asdnsfsnfoinv",
    admin:[
        {
            nome:"Wandson",
            cpf:"123.456.789-00",
            telefone:"(11) 98765-4321",
            email:"wandson@fabreu.com.br",
            password:"mudar@wandson123",
            permissions:["gerenciar_usuarios", "gerenciar_planos", "visualizar_relatorios"]
        },
        {
            nome:"Lael",
            cpf:"456.789.123-00",
            telefone:"(11) 91234-5678",
            email:"lael@fabreu.com.br",
            password:"mudar@lael123",
            permissions:["gerenciar_usuarios", "gerenciar_planos", "visualizar_relatorios"]
        }
    ],
    colaboradores:[
        {
            nome:"Maria",
            cpf:"987.654.321-00",
            telefone:"(11) 91234-5678",
            email:"maria@fabreu.com.br",
            password:"mudar@maria123"
        },
        {
            nome:"Luciano",
            cpf:"654.321.987-00",
            telefone:"(11) 98765-4321",
            email:"luciano@fabreu.com.br",
            password:"mudar@luciano123"
        }
    ],
    clientes:[
        {
            nome:"João Silva",
            cpf:"321.654.987-00",
            telefone:"(11) 91234-5678",
            email:"joao@fabreu.com.br",
            password:"mudar@joao123",
            endereco:{},
            servicos:[
                {
                    tipo:"Internet",
                    plano:"100 Mbps",
                    download:100,
                    upload:50,
                    contrato:"12422",
                    valor:150.00,
                    dataContratacao:"2024-01-15",
                    status:"Ativo",
                    dataCancelamento:null,
                    dataSuspensao:null,
                    dataReativacao:null,
                    dataVencimento:"2024-02-15",
                    historico:[
                        {
                            data:"2024-01-15",
                            descricao:"Contratação do serviço"
                        }
                    ]
                }
            ]
        }
    ],
    projetosFtth:[
        {
            nome:"Projeto FTTH - Bairro Central",
            descricao:"Implantação de rede FTTH no bairro central da cidade",
            status:"Em andamento",
            dataInicio:"2024-01-01",
            dataFimPrevista:"2024-06-30",
            dataFimReal:"2024-06-15",
            popId:"POP-001",
            projetoId:"PROJ-001",

        }
    ],
    Pops:[
        {
            id:"POP-001",
            nome:"POP Central",
            endereco:"Rua das Flores, 123",
            latitude:-23.55052,
            longitude:-46.633308,
            capacidade:1000,
            status:"Ativo",
        }
        ],
    projetos:[
        {
            id:"PROJ-001",
            nome:"Projeto FTTH - Bairro Central",
            descricao:"Implantação de rede FTTH no bairro central da cidade",
            status:"Em andamento",
            dataInicio:"2024-01-01",
            dataFimPrevista:"2024-06-30",
            dataFimReal:"2024-06-15",
            popId:"POP-001",
            cabos:[
                {
                    id:"CABO-001",
                    tipo:"AS",
                    vao:120,
                    numTubos:[
                        {
                            id:"TUBO-001",
                            caboId:"CABO-001",
                            corTubo:"#00ff00",
                            numTubo:"1"
                        }
                    ],
                    fibrasTubo:[
                        {
                            id:"FIBRA-001",
                            tuboId:"TUBO-001",
                            caboId:"CABO-001",
                            corFibra:"#00ff00",
                            numFibra:"1",
                            fusoes:[]
                        }
                    ],
                    patchs:[
                        {
                            id:"PATCH-001",
                            caboId:"CABO-001",
                            tipo:"ponto",
                            latitude:-23.55052,
                            longitude:-46.633308
                        },
                        {
                            id:"PATCH-002",
                            caboId:"CABO-001",
                            tipo:"ponto",
                            latitude:-23.55152,
                            longitude:-46.634308
                        
                        }
                    ],
                   
                    comprimento:500,
                    status:"Instalado",
                    reservas:[
                        {
                            id:"RESERVA-001",
                            caboId:"CABO-001",
                            dataReserva:"2024-01-20",
                            tamanhoReserva:100,
                            status:"Ativa",
                            latitude:-23.55052,
                            longitude:-46.633308
                        }
                    ]
                }
            ],
             caixas:[
                        {
                            id:"CAIXA-001",
                            caboId:"CABO-001",
                            type:"caixa",
                            entrada:[
                                {
                                    id:"ENTRADA-001",
                                    caixaId:"CAIXA-001",
                                    caboId:"CABO-001",
                                    patchId:"PATCH-001",
                                    latitude:-23.55052,
                                    longitude:-46.633308
                                }
                            ],
                            saida:[
                                {
                                    id:"SAIDA-001",
                                    caixaId:"CAIXA-001",
                                    caboId:"CABO-001",
                                    patchId:"PATCH-002",
                                    latitude:-23.55152,
                                    longitude:-46.634308
                                }
                            ],
                            fusoes:[
                                {
                                    id:"FUSAO-001",
                                    caixaId:"CAIXA-001",
                                    caboId:"CABO-001",
                                    tuboId:"TUBO-001",
                                    fibraId:"FIBRA-001",
                                    patchIdEntrada:"PATCH-001",
                                    patchIdSaida:"PATCH-002",
                                    dataFusao:"2024-01-20",
                                    latitude:-23.55052,
                                    longitude:-46.633308
                                }
                            ],
                            latitude:-23.55052,
                            longitude:-46.633308
                        }
                    ],
        }
    ]

}
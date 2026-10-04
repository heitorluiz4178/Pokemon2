// Objeto da Atividade 1
let machop = {
    nome: "Machop",
    numeroPokedex: 66,
    tipo: "Lutador",
    nivel: 15,
    vida: 100,
    energia: 80,
    altura: 0.8,
    peso: 19.5,
    forca: 80,
    defesa: 50,
    velocidade: 35,
    habilidade: "Guts",
    ataques: ["Soco", "Chute", "Karate Chop"],
    fraqueza: "Voador",

    andar: function() {
        console.log("Machop está andando.");
    },

    treinar: function() {
        this.nivel = this.nivel + 1;
        this.forca = this.forca + 5;
        console.log("Machop treinou e ficou mais forte!");
    },

    atacar: function() {
        this.energia = this.energia - 10;
        console.log("Machop atacou!");
    },

    receberDano: function() {
        this.vida = this.vida - 20;
        console.log("Machop recebeu dano!");
    },

    descansar: function() {
        this.energia = this.energia + 20;
        console.log("Machop descansou e recuperou energia.");
    },

    comer: function() {
        this.vida = this.vida + 10;
        console.log("Machop comeu e recuperou vida.");
    }
};

// Elementos da DOM
const nivel = document.querySelector("#nivel");
const vidaTexto = document.querySelector("#vidaTexto");
const energiaTexto = document.querySelector("#energiaTexto");
const barraVida = document.querySelector("#barraVida");
const barraEnergia = document.querySelector("#barraEnergia");
const mensagem = document.querySelector("#mensagem");
const baloon = document.querySelector("#baloon");
const pokemon = document.querySelector(".pokemon");
const efeito = document.querySelector("#efeito");

function atualizarTela() {
    nivel.textContent = "Nível " + machop.nivel;

    let vida = Math.max(0, Math.min(machop.vida, 100));
    let energia = Math.max(0, Math.min(machop.energia, 100));

    vidaTexto.textContent = vida + "/100";
    energiaTexto.textContent = energia + "/100";

    barraVida.style.width = vida + "%";
    barraEnergia.style.width = energia + "%";
}

function mensagemJogo(texto) {
    mensagem.textContent = texto;
    baloon.textContent = texto;
    atualizarTela();
}

function animar(classe) {
    pokemon.classList.remove("pulando", "atacando", "dano", "comendo");
    void pokemon.offsetWidth;
    pokemon.classList.add(classe);

    setTimeout(function() {
        pokemon.classList.remove(classe);
    }, 750);
}

function mostrarEfeito(simbolo) {
    efeito.textContent = simbolo;
    efeito.classList.remove("mostrarEfeito");
    void efeito.offsetWidth;
    efeito.classList.add("mostrarEfeito");
}

// ATACAR
document.querySelector("#btnAtacar").onclick = function() {
    if (machop.energia <= 0) {
        mensagemJogo("⚡ Machop está sem energia! Ele precisa descansar.");
        return;
    }

    machop.atacar();

    if (machop.energia < 0) {
        machop.energia = 0;
    }

    animar("atacando");
    mostrarEfeito("💥");
    mensagemJogo("⚔️ Machop usou " + machop.ataques[0] + "! Gastou 10 de energia.");
};

// COMER
document.querySelector("#btnComer").onclick = function() {
    machop.comer();

    if (machop.vida > 100) {
        machop.vida = 100;
    }

    animar("comendo");
    mostrarEfeito("🍎");
    mensagemJogo("🍎 Machop comeu e recuperou 10 de vida!");
};

// TREINAR
document.querySelector("#btnTreinar").onclick = function() {
    machop.treinar();

    animar("pulando");
    mostrarEfeito("⭐");
    mensagemJogo("🏋️ Machop treinou! Subiu para o nível " + machop.nivel + "!");
};

// DESCANSAR
document.querySelector("#btnDescansar").onclick = function() {
    machop.descansar();

    if (machop.energia > 100) {
        machop.energia = 100;
    }

    animar("pulando");
    mostrarEfeito("⚡");
    mensagemJogo("😴 Machop descansou e recuperou energia!");
};

// RECEBER DANO
document.querySelector("#btnDano").onclick = function() {
    machop.receberDano();

    if (machop.vida < 0) {
        machop.vida = 0;
    }

    animar("dano");
    mostrarEfeito("💥");

    if (machop.vida === 0) {
        mensagemJogo("💀 Machop ficou sem vida!");
    } else {
        mensagemJogo("💥 Machop recebeu 20 de dano!");
    }
};

// ANDAR
document.querySelector("#btnAndar").onclick = function() {
    machop.andar();

    animar("pulando");
    mostrarEfeito("👣");
    mensagemJogo("🚶 Machop está andando pelo campo!");
};

atualizarTela();

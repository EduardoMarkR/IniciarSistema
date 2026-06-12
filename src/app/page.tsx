"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Screen =
  | "intro"
  | "loading"
  | "analysis"
  | "error"
  | "fix"
  | "result"
  | "memory"
  | "unlock"
  | "letter";

const loadingLines = [
  "Iniciando sistema...",
  "Conectando aos servidores do coração...",
  "Conexão estabelecida.",
  "Sincronizando dados...",
  "Carregando módulos de análise...",
];

const analysisLines = [
  "Beleza ........................ 100% 💗",
  "Inteligência ................... 100% 💗",
  "Carisma ....................... 100% 💗",
  "Energia caótica ............... 100% 💗",
  "Capacidade de fazer Eduardo sorrir .... 100% 💗",
  "Fofura detectada .............. ACIMA DO LIMITE 🥺",
  "Capacidade de Eduardo resistir ao sorriso dela .... 0%",
  "Compatibilidade ............... 99,9% 💗",
];

const fixLines = [
  "Iniciando protocolo de correção...",
  "Tentativa 1 ........ falha.",
  "Tentativa 2 ........ falha.",
  "Tentativa 3 ........ falha.",
  "Tentativa 4 ........ falha.",
  "Tentativa 5 ........ falha.",
  "Consultando suporte emocional...",
  "Resposta recebida: sem solução.",
];

export default function Home() {
  const [screen, setScreen] = useState<Screen>("intro");
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);

  const stopSound = useCallback(() => {
    if (!currentAudioRef.current) return;

    currentAudioRef.current.pause();
    currentAudioRef.current.currentTime = 0;
    currentAudioRef.current = null;
  }, []);

  const playSound = useCallback(
    (src: string, loop = false, volume = 0.45) => {
      stopSound();

      const audio = new Audio(src);
      audio.loop = loop;
      audio.volume = volume;

      audio.play().catch(() => {
        console.log("Som bloqueado pelo navegador até a próxima interação.");
      });

      currentAudioRef.current = audio;
    },
    [stopSound]
  );

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;

    if (screen === "loading") {
      playSound("/sounds/typing.mp3", true, 0.25);
      timer = setTimeout(() => setScreen("analysis"), 9000);
    }

    if (screen === "analysis") {
      playSound("/sounds/scan.mp3", true, 0.28);
      timer = setTimeout(() => setScreen("error"), 14500);
    }

    if (screen === "error") {
      playSound("/sounds/alert.mp3", false, 0.65);
      timer = setTimeout(() => setScreen("fix"), 5200);
    }

    if (screen === "fix") {
      playSound("/sounds/love.mp3", false, 0.55);
    }

    if (screen === "result") {
      playSound("/sounds/fail.mp3", true, 0.38);
      timer = setTimeout(() => setScreen("memory"), 9500);
    }

    if (screen === "memory") {
      playSound("/sounds/scan.mp3", true, 0.25);
      timer = setTimeout(() => setScreen("unlock"), 5600);
    }

    if (screen === "unlock") {
      playSound("/sounds/unlock.mp3", false, 0.6);
    }

    if (screen === "letter") {
      playSound("/sounds/love.mp3", true, 0.18);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [screen, playSound]);

  return (
    <main
      className={`page ${
        screen === "error" || screen === "fix" || screen === "result"
          ? "danger"
          : ""
      }`}
    >
      <div className="noise" />

      {screen === "intro" && (
        <section className="card center">
          <p className="tag">♥ TRANSMISSÃO CONFIDENCIAL ♥</p>
          <h1>AVI OS</h1>
          <p className="version">v1.0</p>

          <p className="text">
            Sistema criado por Eduardo Mark para uma única missão: analisar uma
            pessoa perigosamente encantadora.
          </p>

          <button
            onClick={() => {
              playSound("/sounds/startup.mp3", false, 0.55);
              setTimeout(() => setScreen("loading"), 600);
            }}
          >
            INICIAR SISTEMA
          </button>
        </section>
      )}

      {screen === "loading" && (
        <section className="card terminal">
          <h2>AVI OS v1.0</h2>

          {loadingLines.map((line, index) => (
            <p
              key={line}
              className="line"
              style={{ animationDelay: `${index * 1.15}s` }}
            >
              &gt; {line}
            </p>
          ))}

          <div className="progress">
            <span />
          </div>

          <pre className="heart">{`  **   **
 *  * *  *
 *   *   *
  *     *
   *   *
    * *
     *`}</pre>
        </section>
      )}

      {screen === "analysis" && (
        <section className="card terminal">
          <h2>ANALISANDO USUÁRIA: AVI</h2>

          {analysisLines.map((line, index) => (
            <p
              key={line}
              className="line"
              style={{ animationDelay: `${index * 1.55}s` }}
            >
              {line}
            </p>
          ))}
        </section>
      )}

      {screen === "error" && (
        <section className="card center errorScreen">
          <div className="warning">!</div>
          <h1>ERRO CRÍTICO</h1>

          <p className="text">Falha grave no sistema detectada.</p>
          <p className="text">Analisando origem do problema...</p>
        </section>
      )}

      {screen === "fix" && (
        <section className="card center">
          <p className="tag red">ERRO DETECTADO</p>

          <h2>Motivo encontrado:</h2>
          <h1 className="love">EDUARDO ESTÁ APAIXONADO.</h1>

          <button onClick={() => setScreen("result")}>CORRIGIR ERRO</button>
        </section>
      )}

      {screen === "result" && (
        <section className="card terminal">
          <h2>Tentando corrigir...</h2>

          {fixLines.map((line, index) => (
            <p
              key={line}
              className="line"
              style={{ animationDelay: `${index * 0.95}s` }}
            >
              &gt; {line}
            </p>
          ))}

          <div className="alertBox delayedAlert">
            ERRO IMPOSSÍVEL DE CORRIGIR.
          </div>
        </section>
      )}

      {screen === "memory" && (
        <section className="card terminal">
          <h2>CARREGANDO MEMÓRIA...</h2>

          <div className="progress complete">
            <span />
          </div>

          <p className="line show">Arquivo de momentos encontrado.</p>
          <p className="line show">Memória carregada com sucesso. 💗</p>

          <p className="bigHeart">♥</p>
        </section>
      )}

      {screen === "unlock" && (
        <section className="card center unlockCard">
          <p className="lock">🔓</p>

          <h1 id="unlockTitle">ARQUIVO CONFIDENCIAL DESBLOQUEADO</h1>

          <p className="text">Acesso liberado.</p>

          <p className="text">
            Aqui está algo que eu precisava guardar só pra você. 💌
          </p>

          <button onClick={() => setScreen("letter")}>LER CARTA</button>
        </section>
      )}

      {screen === "letter" && (
        <section className="letterCard">
          <p className="tag">♥ CARTA PARA AVI ♥</p>

          <div className="letterText">
            <p>Sabe Vida,</p>

            <p>
              Hoje me peguei pensando, qual o significado da palavra namorado?
            </p>

            <p>E sabe, eu descobri que significa tudo o que somos.</p>

            <p>
              A palavra vem do latim vulgar &quot;innamorare&quot;, que
              significa essencialmente &quot;estar em amor&quot; ou
              &quot;apaixonar-se&quot;.
            </p>

            <p>
              Ao ler isso, me dei conta que já te namorava bem antes mesmo do
              namoro oficial, pq desde os primeiros dias contigo eu já estava em
              amor, e totalmente apaixonado.
            </p>

            <p>
              Obrigado por ser esse serzinho na minha vida, que me traz luz,
              energia, boas risadas, histórias pra compartilhar e ombro pra me
              ouvir.
            </p>

            <p className="final">Feliz dia de namorades &lt;3</p>
          </div>
        </section>
      )}
    </main>
  );
}
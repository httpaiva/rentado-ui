"use client";

import withoutAuth from "@/hooks/withoutAuth";
import PublicHeader from "@/components/home/PublicHeader";
import { Footer } from "@/components/Footer";
import Image from "next/image";
import { useRouter } from "next/navigation";

function Home() {
  const router = useRouter();

  return (
    <main>
      <PublicHeader />
      <section className="flex flex-col justify-center items-center bg-blue-600 min-h-[720px] p-8">
        <div className="flex justify-center items-center gap-16 p-12">
          <div className="flex flex-col gap-12 max-w-2xl text-center">
            <h1 className="text-white text-4xl font-bold">
              Simplifique a Gestão de Seus Imóveis com o Rentado!
            </h1>
            <h3 className="text-white text-2xl">
              Controle contratos, pagamentos e prazos em um único sistema.
            </h3>
            <button
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold"
              onClick={() => {
                router.push("/signup");
              }}
            >
              Experimente agora - Cadastro Gratuito!
            </button>
          </div>

          <Image
            src="/tablet-couple.svg"
            alt="Couple seeing a tablet"
            height={500}
            width={500}
          />
        </div>
      </section>

      <section className="bg-gray-800 text-center py-24" id="about">
        <div className="max-w-xl mx-auto text-white mb-12">
          <h1 className="text-4xl font-bold">Sobre o Rentado</h1>
          <h3 className="text-2xl mt-6 text-justify">
            O Rentado é uma plataforma feita para locadores autônomos que
            desejam gerenciar seus imóveis sem complicação. Diferente de
            plataformas de divulgação, o Rentado se concentra na organização
            completa dos seus contratos, imóveis e locatários em um único lugar.
          </h3>
        </div>

        <div className="flex flex-wrap justify-center gap-12 p-12">
          <div className="bg-blue-600 text-white p-6 rounded-lg shadow-lg max-w-xs w-full text-center">
            <p>Cadastro completo de imóveis e inquilinos</p>
          </div>

          <div className="bg-blue-600 text-white p-6 rounded-lg shadow-lg max-w-xs w-full text-center">
            <p>
              Centralização de contas e serviços, para um controle financeiro
              sem esforço
            </p>
          </div>

          <div className="bg-blue-600 text-white p-6 rounded-lg shadow-lg max-w-xs w-full text-center">
            <p>Alertas automáticos para prazos importantes</p>
          </div>
        </div>
        <div className="flex justify-center">
          <Image
            src="/house-searching.svg"
            alt="Boy searching for houses"
            height={300}
            width={300}
          />
        </div>
      </section>

      <section className="bg-blue-600 text-white py-24" id="advantages">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Vantagens de Usar o Rentado</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
            <div className="flex flex-col items-center justify-center gap-12">
              <div className="bg-white text-gray-900 p-8 rounded-xl shadow-lg flex flex-col items-center justify-center transition-transform transform hover:scale-105">
                <h3 className="text-xl font-semibold mb-4 text-center">
                  Controle Total
                </h3>
                <p className="text-center">
                  Mantenha tudo em um só lugar, do cadastro de imóveis aos
                  contratos.
                </p>
              </div>

              <div className="bg-white text-gray-900 p-8 rounded-xl shadow-lg flex flex-col items-center justify-center transition-transform transform hover:scale-105">
                <h3 className="text-xl font-semibold mb-4 text-center">
                  Alertas Inteligentes
                </h3>
                <p className="text-center">
                  Receba lembretes automáticos de datas importantes para evitar
                  problemas.
                </p>
              </div>

              <div className="bg-white text-gray-900 p-8 rounded-xl shadow-lg flex flex-col items-center justify-center transition-transform transform hover:scale-105">
                <h3 className="text-xl font-semibold mb-4 text-center">
                  Relatórios Intuitivos
                </h3>
                <p className="text-center">
                  Visualize suas finanças e contratos em poucos cliques, sem
                  complicação.
                </p>
              </div>
            </div>

            <div className="flex justify-center">
              <Image
                src="/device.svg"
                alt="Smartphone device"
                height={200}
                width={200}
                className="w-full max-w-xs sm:max-w-md lg:max-w-sm"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-800 py-24" id="how-it-works">
        <div className="flex flex-col items-center gap-12">
          <h1 className="text-white text-4xl font-bold text-center">
            Como Funciona?
          </h1>

          {[
            {
              title: "Passo 1",
              content: "Cadastre seus imóveis e locatários.",
            },
            {
              title: "Passo 2",
              content: "Insira dados sobre contratos e pagamentos.",
            },
            {
              title: "Passo 3",
              content: "Deixe o Rentado te lembrar de cada prazo e vencimento.",
            },
            {
              title: "Passo 4",
              content: "Monitore todos os dados financeiros e contratuais de forma.",
            },
          ].map((step) => (
            <div
              key={step.title}
              className="bg-blue-600 text-white p-6 rounded-lg max-w-xs text-center"
            >
              <h3 className="text-xl font-semibold">{step.title}</h3>
              <p>{step.content}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-blue-600 py-16">
        <div className="flex flex-col items-center gap-6">
          <h2 className="text-white text-3xl font-semibold text-center">
            Quer transformar a gestão dos seus imóveis?
          </h2>
          <button
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold"
            onClick={() => {
              router.push("/signup");
            }}
          >
            Cadastre-se agora
          </button>
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default withoutAuth(Home);

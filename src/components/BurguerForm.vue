<script>
import Mensagem from "./Mensagem.vue";

export default {
  name: "BurguerForm",
  data() {
    return {
      // dados vindo do servidor
      paes: null,
      opcionaisData: null,
      carnes: null,
      nome: null,
      pao: null,
      carne: null,
      opcionais: [],
      status: "solicitado",
      msg: null,
    };
  },
  methods: {
    async getIngredientes() {
      const req = await fetch("http://localhost:3000/ingredientes");
      const data = await req.json();
      this.paes = data.paes;
      this.carnes = data.carnes;
      this.opcionaisData = data.opcionais;
    },
    async createBurguer(e) {
      e.preventDefault();
      // vai receber os valores do v-model
      const data = {
        nome: this.nome,
        pao: this.pao,
        carne: this.carne,
        opcionais: Array.from(this.opcionais),
        status: "solicitado",
      };
      /*os dados do objeto assima precisam ser convertidos para o formato de texto json
              para q possam ser mandados para o servidor via request*/
      // enviando a requisicao
      const dadoJson = JSON.stringify(data);
      const req = await fetch("http://localhost:3000/burgers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: dadoJson,
      });
      // chamar um componente msg de aviso "burger montado! ..."
      const res = await req.json();
      // exibir msg
      this.msg = `pedido n° ${res.id} foi solicitado!`;

      // limpar msg
      setTimeout(() => (this.msg = ""), 3000);

      // limpar formulario
      (this.nome = ""),
        (this.pao = ""),
        (this.carne = ""),
        (this.opcionais = ""),
        (this.status = "");
    },
  },
  mounted() {
    this.getIngredientes();
  },
  components: {
    Mensagem,
  },
};
</script>

<template>
  <div>
    <div class="container p-2">
      <Mensagem :msg="msg" v-show="msg" />
      <h1 class="p-2">Monte Seu Burguer:</h1>
      <form class="form-label" @submit="createBurguer">
        <div class="row">
          <div class="border-start border-warning border-4 rounded-1 mb-3">
            <label class="text-center" for="nome">Nome do cliente:</label>
          </div>
          <div class="row">
            <div class="col-sm-5">
              <input
                class="form-control text-sm-start text-wrap mb-3 w-100"
                type="text"
                id="nome"
                name="nome"
                v-model="nome"
                placeholder="digite o seu nome"
              />
            </div>
          </div>

          <div class="row">
            <div class="border-start border-warning border-4 rounded-1 mb-3">
              <label class="text-center" for="pao">Escolha o pao:</label>
            </div>

            <div class="col-sm-5 mb-3">
              <select class="w-100" name="pao" id="pao" v-model="pao">
                <option v-for="pao in paes" :key="pao.id" :value="pao.tipo">
                  {{ pao.tipo }}
                </option>
              </select>
            </div>
          </div>

          <div class="row">
            <div class="border-start border-warning border-4 rounded-1 mb-3">
              <label class="text-center" for="carne">Escolha a carne:</label>
            </div>

            <div class="col-sm-5 mb-3">
              <select class="w-100" name="carne" id="carne" v-model="carne">
                <option v-for="carne in carnes" :key="carne.id" :value="carne.tipo">
                  {{ carne.tipo }}
                </option>
              </select>
            </div>
          </div>

          <!-- check de opcoes -->
          <div class="row">
            <div class="border-start border-warning border-4 rounded-1 mb-3">
              <label class="text-center" id="" for="opcionais"
                >Escolha os opcionais</label
              >
            </div>
            <div class="col-sm-6">
              <div v-for="op in opcionaisData" :key="op.id" class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  name="opcionais"
                  v-model="opcionais"
                  :value="op.tipo"
                />
                <span class="form-check-label">{{ op.tipo }}</span>
              </div>
            </div>
            
          </div>

          <div class="p-3">
            <button type="submit" class="btn btn-dark text-warning">montar</button>
          </div>

        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
  
</style>

<script>
import Mensagem from "./Mensagem.vue";
export default {
  name: "Dashboard",
  data() {
    return {
      burgers: null,
      burgers_id: null,
      status: [],
      msg: "",
    };
  },
  methods: {
    async getPedidos() {
      const req = await fetch("http://localhost:3000/burgers");
      const data = await req.json();
      this.burgers = data;
      // pergar status
      this.getStatus();
    },
    async getStatus() {
      const req = await fetch("http://localhost:3000/status");
      const data = await req.json();
      this.status = data;
    },
    async deleteBurger(id) {
      const req = await fetch(`http://localhost:3000/burgers/${id}`, {
        method: "DELETE",
      });
      this.getPedidos();

      this.msg = `O pedido n° ${id} foi removido`;
      setTimeout(() => (this.msg = ""), 3000);
    },
    async updatBurger(event, id) {
      // ira pegar o valor q foi modificado
      const opcao = event.target.value;
      const dataJson = JSON.stringify({ status: opcao });
      const req = await fetch(`http://localhost:3000/burgers/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: dataJson,
      });
      const res = await req.json();
    },
  },
  mounted() {
    this.getPedidos();
  },
  components: { Mensagem },
};
</script>

<template>
  <div class="container">
    <Mensagem :msg="msg" v-show="msg" />
    <div id="tabela" class="table-responsive">
      <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Clientes</th>
          <th scope="col">Pão</th>
          <th scope="col">Carne</th>
          <th scope="col">Opcionais</th>
          <th scope="col">Ações</th>
        </tr>
      </thead>
      <tbody class="table-group-divider">
        <tr v-for="item in burgers" :key="item.id">
          <th scope="row">{{ item.id }}</th>
          <td>{{ item.nome }}</td>
          <td>{{ item.pao }}</td>
          <td>{{ item.carne }}</td>
          <td>
            <ul>
              <li v-for="i in item.opcionais" :key="i.id">
                {{ i }}
              </li>
            </ul>
          </td>
          <td>
            <div class="">
              <select class="form-select" name="status" @change="updatBurger($event, item.id)">
                <option class="ocultar" value="">{{ item.status }}</option>
                <option v-for="s in status" :key="s.id" :value="s.tipo">
                  {{ s.tipo }}
                </option>
              </select>
              <button class="btn btn-dark text-warning mt-1 w-100" @click="deleteBurger(item.id)">Cancelar</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    </div>
  </div>
</template>

<style scoped>
 #tabela {
   margin-top: 80px;
 }
</style>

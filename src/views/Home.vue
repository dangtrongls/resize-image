<template>
  <div class="home">
    <h1>Resize Image</h1>
    <input type="file" @change="croppie" />
    <b-container fluid class="bv-example-row">
      <b-row class="mb-2">
        <b-col></b-col>
        <b-col>
          <vue-croppie
            ref="croppieRef"
            :enableOrientation="true"
            :boundary="{ width: 450, height: 300 }"
            :viewport="{ width: 400, height: 250, type: 'square' }"
          >
          </vue-croppie>
        </b-col>
        <b-col order="">
          <div style="border-style: dotted">
            <div class="mt-3 mb-3">
              <b-button variant="outline-primary" @click="crop500"
                >500x500</b-button
              >&nbsp;
              <b-button variant="outline-secondary" @click="crop800"
                >800x800</b-button
              >&nbsp;
              <b-button variant="danger" @click="crop"
                ><b-icon
                  icon="bounding-box-circles"
                  aria-hidden="true"
                  @click="crop"
                ></b-icon>
                Crop</b-button
              >
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
    <div v-if="cropped">
      <b-container fluid class="bv-example-row">
        <b-row class="mb-2">
          <b-col></b-col>
          <b-col><img :src="cropped" /></b-col>
          <b-col order="">
            <div style="border-style: dotted">
              <div class="mt-3 mb-3">
                <b-button
                  variant="primary"
                  @click="downloadFile(fileName, base64data, fileType)"
                  ><b-icon icon="cloud-download" aria-hidden="true"></b-icon
                  >Download
                </b-button>
              </div>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      croppieImage: "",
      cropped: null,
    };
  },
  components: {},
  methods: {
    croppie(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      var reader = new FileReader();
      reader.onload = (e) => {
        this.$refs.croppieRef.bind({
          url: e.target.result,
        });
      };
      reader.readAsDataURL(files[0]);
    },

    crop() {
      let options = {
        type: "base64",
        size: { width: 450, height: 300 },
        format: "jpeg",
      };
      this.$refs.croppieRef.result(options, (output) => {
        this.cropped = this.croppieImage = output;
        console.log(this.croppieImage);
      });
    },

    crop500() {
      
    },

    crop800() {
      alert("Đang cập nhập");
    },

    downloadFile() {
      
    },
  },
};
</script>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<style>
.btn-dowload {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>

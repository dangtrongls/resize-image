<template>
  <div class="home">
    <h1>Resize Image Watermart</h1>
    <input type="file" @change="croppie" />
    <b-container fluid class="bv-example-row">
      <b-row class="mb-2">
        <b-col></b-col>
        <b-col class="content">
          <vue-croppie
            ref="croppieRef"
            :enableOrientation="true"
            :boundary="{ width: 450, height: 300 }"
            :viewport="{ width: 400, height: 250, type: 'square' }"
            :enableExif="true"
          >
          </vue-croppie>
        <div>
    
      <div class="mt-2"></div>
    </div>
        </b-col>
        <b-col order="" v-if="file">
          <div style="border-style: dotted">
            <div class="mt-3 mb-3">
             <b-button variant="warning" @click="addText" ><b-icon icon="plus" aria-hidden="true"></b-icon>Add text</b-button> &nbsp;
              <b-button variant="primary" @click="addImage"><b-icon icon="plus" aria-hidden="true"></b-icon>Add image</b-button> &nbsp;
              <b-button variant="success" @click="check_image"
                ><b-icon icon="check2" aria-hidden="true"></b-icon>
                Check</b-button
              >
              &nbsp;
              <b-button
                variant="danger"
                v-if="
                  file &&
                  height != height_default &&
                  width != width_default &&
                  text
                "
                @click="auto"
                ><b-icon
                  icon="bounding-box-circles"
                  aria-hidden="true"
                ></b-icon>
                Auto</b-button
              >
            </div>
            <div v-if="!checkImage && file">
              <span>Height: {{ height }}px</span>&nbsp;
              <span>Width: {{ width }}px</span>&nbsp; <span>Text: </span>&nbsp;
            </div>
          </div>
        </b-col>
        <b-col v-else></b-col>
      </b-row>
    </b-container>
    <div v-if="cropped && file">
      <b-container fluid class="bv-example-row">
        <b-row class="mb-2">  
          <b-col></b-col>
          <b-col><img :src="cropped" /></b-col>
          <b-col>
            <div style="border-style: dotted">
              <div class="mt-3 mb-3">
                <b-button variant="primary" @click="downloadFile"
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
// import Moveable from 'vue-moveable';
export default {
  data() {
    return {
      croppieImage: "",
      cropped: null,
      url: null,
      file: "",
      height: "",
      width: "",
      checkImage: true,
      height_default: "",
      width_default: "",
      er: null,
      text: "",
      errors: [],
      // addText: false
    };
  },
  components: {},
  methods: {
    croppie(e) {
      var files = e.target.files || e.dataTransfer.files;
      this.file = files;
      if (!files.length);
      var reader = new FileReader();
      reader.onload = (e) => {
        this.$refs.croppieRef.bind({
          url: e.target.result,
        });
      };
      return reader.readAsDataURL(files[0]);
    },
    auto() {
      let options = {
        type: "base64",
        size: { width: this.width_default, height: this.height_default },
        format: "jpeg/jpg/png",
      };
      this.$refs.croppieRef.result(options, (output) => {
        this.cropped = this.croppieImage = output;
      });
    },
    check_image() {
      let _show = Object.assign({}, this.checkImage);
      _show = !_show;
      this.checkImage = _show;
      let check = this.file;
      let params = {
        social: "facebook",
        check_image: check,
      };
      if (this.er) {
        this.$toast.error("The picture is not in the correct format.");
      }
      if (!this.file) {
        this.$toast.error("Please choose photo.");
      }
      if (!this.text) {
        this.$toast.error("Text cannot be left blank");
      }
      this.errors = [];
      console.log(params);
      this.CallAPI(
        "post",
        "check-image",
        params,
        (res) => {
          if (res.data.status == true) {
            this.$toast.success("Size true image.");
            this.height = res.data.data.height_image;
            this.width = res.data.data.width_image;
            this.width_default = res.data.data.width_default;
            this.height_default = res.data.data.height_default;
          } else {
            this.$toast.error("Malformed size.");
            this.height = res.data.data.height_image;
            this.width = res.data.data.width_image;
            this.width_default = res.data.data.width_default;
            this.height_default = res.data.data.height_default;
          }
        },
        (error) => {
          if (error.response.status === 422) {
            this.er = error.response.data.check_image;
          }
        }
      );
    },
    addText() {
      alert('Đang cập nhập')
    },
    addImage() {
      alert('Đang cập nhập');
    },
    downloadFile() {
      var name = this.file;
      console.log(name);
      var a = document.createElement("a");
      a.href = this.croppieImage;
      a.download = name[0].name;
      a.click();
    },
  },
};
</script>
<style>
.cr-viewport cr-vp-square {
  color: red;
}
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

.text-content {
  position: absolute;
  bottom: 100px;
  right: 20px;
  background-color: black;
  color: white;
  padding-left: 20px;
  padding-right: 20px;
  z-index: 9999;
}

.content {
  
}
</style>
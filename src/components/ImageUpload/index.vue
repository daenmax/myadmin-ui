<template>
  <div class="component-upload-image">
    <el-upload multiple :action="uploadImgUrl" list-type="picture-card" :on-success="handleUploadSuccess"
      :before-upload="handleBeforeUpload" :limit="limit" :on-error="handleUploadError" :on-exceed="handleExceed"
      ref="imageUpload" :on-remove="handleDelete" :show-file-list="true" :headers="headers" :file-list="fileList"
      :on-preview="handlePictureCardPreview" :class="{ hide: this.fileList.length >= this.limit }">
      <i class="el-icon-plus"></i>
    </el-upload>

    <!-- 上传提示 -->
    <div class="el-upload__tip" slot="tip" v-if="showTip">
      可上传
      <template v-if="limit"> 最多 <b style="color: #f56c6c">{{ limit }}个</b> </template>
      <template v-if="fileSize"> 大小不超过 <b style="color: #f56c6c">{{ fileSize }}MB</b> </template>
      <template v-if="fileType"> 格式为 <b style="color: #f56c6c">{{ fileType.join("/") }}</b> </template>
      的图片
    </div>

    <el-dialog :visible.sync="dialogVisible" title="预览" width="800" append-to-body>
      <img :src="dialogImageUrl" style="display: block; max-width: 100%; margin: 0 auto" />
    </el-dialog>
  </div>
</template>

<script>
import { getToken } from "@/utils/auth";
import { listByIds, del } from "@/api/monitor/file";

export default {
  props: {
    value: [String, Object, Array],
    // 图片数量限制
    limit: {
      type: Number,
      default: 4,
    },
    // 大小限制(MB)
    // 这里是默认的，如果后端接口没有配置相应参数，那么将会使用这个
    fileSize: {
      type: Number,
      default: 2,
    },
    // 文件类型, 例如['png', 'jpg', 'jpeg']
    // 这里是默认的，如果后端接口没有配置相应参数，那么将会使用这个
    fileType: {
      type: Array,
      default: () => ["bmp", "gif", "jpg", "jpeg", "png"],
    },
    // 是否显示提示
    isShowTip: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      number: 0,
      uploadList: [],
      dialogImageUrl: "",
      dialogVisible: false,
      hideUpload: false,
      baseUrl: process.env.VUE_APP_BASE_API,
      uploadImgUrl: process.env.VUE_APP_BASE_API + "/monitor/file/uploadImage", // 上传的图片服务器地址
      headers: {
        Authorization: "Bearer " + getToken(),
      },
      fileList: []
    };
  },
  watch: {
    value: {
      async handler(val) {
        if (val) {
          // 首先将值转为数组
          let list;
          if (Array.isArray(val)) {
            list = val;
          } else {
            await listByIds(val).then(res => {
              list = res.data;
            })
          }
          // 然后将数组转为对象数组
          this.fileList = list.map(item => {
            item = { originalName: item.originalName, url: item.fileUrl, sysFileId: item.id };
            return item;
          });
        } else {
          this.fileList = [];
          return [];
        }
      },
      deep: true,
      immediate: true
    }
  },
  computed: {
    // 是否显示提示
    showTip() {
      return this.isShowTip && (this.fileType || this.fileSize);
    },
  },
  methods: {
    // 上传前loading加载
    handleBeforeUpload(file) {
      let isImg = false;
      if (this.fileType.length) {
        let fileExtension = "";
        if (file.name.lastIndexOf(".") > -1) {
          fileExtension = file.name.slice(file.name.lastIndexOf(".") + 1);
        }
        isImg = this.fileType.some((type) => {
          if (file.type.indexOf(type) > -1) return true;
          if (fileExtension && fileExtension.indexOf(type) > -1) return true;
          return false;
        });
      } else {
        isImg = file.type.indexOf("image") > -1;
      }

      if (!isImg) {
        this.$modal.msgError(`文件格式不正确, 请上传${this.fileType.join("/")}图片格式文件!`);
        return false;
      }
      if (this.fileSize) {
        const isLt = file.size / 1024 / 1024 < this.fileSize;
        if (!isLt) {
          this.$modal.msgError(`上传图片大小不能超过 ${this.fileSize} MB!`);
          return false;
        }
      }
      this.$modal.loading("正在上传图片，请稍候...");
      this.number++;
    },
    // 文件个数超出
    handleExceed() {
      this.$modal.msgError(`上传文件数量不能超过 ${this.limit} 个!`);
    },
    // 上传成功回调
    handleUploadSuccess(res, file) {
      if (res.code === 200) {
        if (res.data.isExist) {
          this.number--;
          this.$modal.closeLoading();
          this.$modal.msgError("该文件MD5用已经存在，请勿改名重复上传");
          this.$refs.imageUpload.handleRemove(file);
          this.uploadedSuccessfully();
          return;
        }
        this.uploadList.push({ originalName: res.data.originalName, url: res.data.fileUrl, sysFileId: res.data.sysFileId });
        this.uploadedSuccessfully();
      } else {
        this.number--;
        this.$modal.closeLoading();
        this.$modal.msgError(res.msg);
        this.$refs.imageUpload.handleRemove(file);
        this.uploadedSuccessfully();
      }
    },
    // 删除图片
    handleDelete(file) {
      const findex = this.fileList.map(f => f.sysFileId).indexOf(file.sysFileId);
      if (findex > -1) {
        let sysFileId = this.fileList[findex].sysFileId;
        del(sysFileId);
        this.fileList.splice(findex, 1);
        this.$emit("input", this.listToString(this.fileList));
      }
    },
    // 上传失败
    handleUploadError(res) {
      this.$modal.msgError("上传图片失败，请重试");
      this.$modal.closeLoading();
    },
    // 上传结束处理
    uploadedSuccessfully() {
      if (this.number > 0 && this.uploadList.length === this.number) {
        this.fileList = this.fileList.concat(this.uploadList);
        this.uploadList = [];
        this.number = 0;
        this.$emit("input", this.listToString(this.fileList));
        this.$modal.closeLoading();
      }
    },
    // 预览
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 对象转成指定字符串分隔
    listToString(list, separator) {
      let strs = "";
      separator = separator || ",";
      for (let i in list) {
        if (list[i].sysFileId) {
          strs += list[i].sysFileId + separator;
        }
      }
      return strs != "" ? strs.substr(0, strs.length - 1) : "";
    }
  }
};
</script>
<style scoped lang="scss">
// .el-upload--picture-card 控制加号部分
::v-deep.hide .el-upload--picture-card {
  display: none;
}

// 去掉动画效果
::v-deep .el-list-enter-active,
::v-deep .el-list-leave-active {
  transition: all 0s;
}

::v-deep .el-list-enter,
.el-list-leave-active {
  opacity: 0;
  transform: translateY(0);
}
</style>


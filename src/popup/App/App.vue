<template>
  <div class="main_app">
    <el-form ref="form" :model="form" label-width="80px" label-position="left">
      <!-- <el-form-item label="下载文件夹">
        <el-input v-model="form.folder"></el-input>
      </el-form-item> -->
      <el-form-item label="选择网站">
        <el-select v-model="form.type" placeholder="请选择网站">
          <el-option label="掘金" value="juejin"></el-option>
          <el-option label="拉钩" value="lagou"></el-option>
          <!-- <el-option label="Github_issues" value="github_issues"></el-option> -->
          <el-option label="其他" value="other"></el-option>
        </el-select>
      </el-form-item>
      <template v-if="form.type === 'other'">
        <el-form-item label="标题元素">
          <el-input v-model="form.body.title"></el-input>
        </el-form-item>
        <el-form-item label="标题内容">
          <el-input v-model="form.body.content"></el-input>
        </el-form-item>
      </template>

      <el-row>
        <el-col :span="12">
          <el-button type="primary" @click="handleClickSave">保存</el-button>
        </el-col>
        <el-col :span="12">
          <el-button type="primary" @click="handleClickDownLoad"
            >下载</el-button
          >
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import turndown from "turndown";
import download from "../../utils/download";

export default {
  name: "app",
  data() {
    return {
      form: {
        // folder: "",
        type: "juejin",
        body: {
          title: "",
          content: ""
        }
      }
    };
  },
  methods: {
    async handleClickSave() {
      localStorage.setItem("form", JSON.stringify(this.form));
    },
    async handleClickDownLoad() {
      const data = await this.handleSendMessage(this.form);
      if (data) {
        const { content, title } = data || {};

        if (!title) return alert("标题不存在");
        if (!content) return alert("内容不存在");

        const turndownService = new turndown({
          headingStyle: "atx",
          codeBlockStyle: "fenced"
        });
        const markdown = turndownService.turndown(content.trim());
        download(markdown, `${title.trim()}.md`);
      } else {
        alert("下载失败");
      }
    },
    handleSendMessage(message) {
      return new Promise(resolve => {
        chrome.tabs.query(
          {
            active: true,
            currentWindow: true
          },
          tabs => {
            chrome.tabs.sendMessage(tabs[0].id, message, res => {
              resolve(res);
            });
          }
        );
      });
    }
  },
  created() {
    const form = localStorage.getItem("form");
    if (form) {
      this.form = Object.assign(this.form, JSON.parse(form));
    }
  }
};
</script>

<style lang="less" scoped>
.main_app {
  width: 300px;
  height: 300px;
  padding: 30px;
  text-align: center;
}
</style>

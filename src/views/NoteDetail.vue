<template>
  <div id="note" class="detail">
    <NoteSidebar
      @changeNotebook="changeNotebook"
      :notes="notes"
      @changeNote="changeNote"
    ></NoteSidebar>
    <div class="note-detail">
      <div class="note-empty" v-show="!curNote.id">请选择或新建笔记</div>
      <div class="note-detail-ct" v-show="curNote.id">
        <div class="note-bar">
          <span> 创建日期:{{ curNote.friendlyCreatedAt }}</span>
          <span> 更新日期:{{ curNote.friendlyUpdatedAt }}</span>
          <span>{{ updateStatus }}</span>
          <span class="iconfont icon-delete" @click="deleteNote"></span>
          <span
            class="iconfont"
            @click="isShowMarkDown = !isShowMarkDown"
            :class="isShowMarkDown ? 'icon-suoxiao' : 'icon-fullscreen'"
          ></span>
        </div>
        <div class="note-title">
          <input
            type="text"
            placeholder="输入标题"
            v-model="curNote.title"
            @input="update"
            @keydown="updateStatus = '正在输入...'"
          />
        </div>
        <div class="editor">
          <textarea
            placeholder="输入内容, 支持 markdown 语法"
            v-model="curNote.content"
            @input="update"
            @keydown="updateStatus = '正在输入...'"
            v-show="!isShowMarkDown"
          ></textarea>
          <div
            class="preview markdown-body"
            v-show="isShowMarkDown"
            v-html="markdown"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NoteSidebar from "@/components/note-sidebar/NoteSidebar";
import Notes from "@/apis/notes";
import _ from "lodash";
// import MarkdownIt from "markdown-it";
import marked from "marked";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      // notes: [],
      curNote: {},
      updateStatus: "笔记未改动",
      isShowMarkDown: false,
    };
  },
  components: {
    NoteSidebar,
  },

  methods: {
    ...mapActions(["getAllNotebooks"]),
    changeNotebook(notebookId) {
      // this.notes = [];
      this.curNote = {};
      Notes.getAll(notebookId).then(() => {
        // this.notes = res;
        // this.curNote = this.notes[0] || {};
      });
      // this.curNote = this.notes.find((note) => note.id == notebookId) || {};
    },
    changeNote() {
      // this.curNote = this.notes.find((note) => note.id == noteId) || {};
    },
    deleteNote() {
      Notes.delete(this.curNote.id).then((res) => {
        this.$message.success({ message: res.msg });
        this.notes.splice(this.notes.indexOf(this.curNote), 1);
        this.curNote = {};
        if (
          this.$route.query !==
          `/note?notebookId=${this.$route.query.notebookId}`
        ) {
          this.$router.replace(
            `/note?notebookId=${this.$route.query.notebookId}`
          );
        }
      });
    },

    update: _.debounce(function () {
      Notes.update(this.curNote.id, this.curNote.title, this.curNote.content)
        .then(() => (this.updateStatus = "保存成功"))
        .catch(() => {
          this.updateStatus = "保存失败";
        });
    }, 300),
  },
  created() {
    const notebookId = this.$route.query.notebookId;
    if (notebookId) {
      Notes.getAll(notebookId).then((res) => {
        // this.notes = res;
        this.curNote = res[0] || {};
      });
    } else {
      return;
    }
  },
  computed: {
    markdown() {
      return marked(this.curNote.content || "");
    },
    ...mapGetters(["notebooks", "notes"]),
  },
};
</script>

<style lang="stylus" stylesheet="css">


#note {
  display: flex;
  align-items: stretch;
  background-color: #fff;
  flex: 1;
}

.note-detail {
  flex: 1;
  display: flex;
  flex-direction: column;

  .note-detail-ct {
    height: 100%;
  }

  .note-empty {
    font-size: 50px;
    color: #ccc;
    text-align: center;
    margin-top: 100px;
  }

  .note-bar {
    padding: 4px 20px;
    border-bottom: 1px solid #eee;
    &:after {
      content:'';
      display: block;
      clear: both;
    }
    span {
      font-size: 12px;
      color: #999;
      margin-right: 4px;
    }
    .iconfont{
      float: right;
      margin-left: 4px;
      font-size: 18px;
      cursor: pointer;
    }

  }

  .note-title{
    input,span {
      display: inline-block;
      width: 100%;
      border: none;
      outline: none;
      font-size: 18px;
      padding: 10px 20px;
    }
  }

  .editor {
    height: calc(100% - 70px);
    position: relative;
  }
  textarea, .preview {
    position: absolute;
    width: 100%;
    height: 100%;
    padding: 20px;
  }

  textarea {
    border: none;
    resize: none;
    outline: none;
    font-size: 14px;
    font-family: 'Monaco', courier, monospace;
  }

  code {
    color: #f66;
  }
}
</style>

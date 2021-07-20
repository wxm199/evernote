<template>
  <div class="note-sidebar">
    <span class="btn add-note" @click="onAddNote">添加笔记</span>
    <el-dropdown
      class="notebook-title"
      @command="handleCommand"
      placement="bottom"
    >
      <span class="el-dropdown-link">
        {{ curBook.title }} <i class="iconfont icon-down"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          v-for="(notebook, index) in notebooks"
          :command="notebook.id"
          :key="index"
          >{{ notebook.title }}</el-dropdown-item
        >
        <el-dropdown-item command="trash">回收站</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <div class="menu">
      <div>更新时间</div>
      <div>标题</div>
    </div>
    <ul class="notes">
      <li
        v-for="(note, index) in notes"
        :key="index"
        @click="changeNote(note.id)"
      >
        <router-link :to="`/note?noteId=${note.id}&notebookId=${curBook.id}`">
          <span class="date">{{ note.friendlyCreatedAt }}</span>
          <span class="title">{{ note.title }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
// import Bus from "@/helpers/bus";
// import Notebooks from "@/apis/notebooks";"@/common/event";
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
  created() {
    this.getAllNotebooks().then(() => {
      const curBookId = this.$route.query.notebookId || this.notebooks[0].id;
      this.setCurBook({ curBookId });
      this.getNotes({ notebookId: curBookId });
    });

    // this.notes.forEach((item) => console.log(item));
  },
  data() {
    return {
      // notebooks: [],
      // curBook: {},
    };
  },

  methods: {
    ...mapActions(["getAllNotebooks", "getNotes", "addNote"]),
    ...mapMutations(["setCurBook"]),
    handleCommand(notebookId) {
      if (notebookId == "trash") {
        return this.$router.push({ path: "/trash" });
      }
      this.setCurBook({ curBookId: notebookId });
      this.getNotes({ notebookId });

      // this.curBook = this.notebooks.find(
      //   (notebook) => notebook.id == notebookId
      // );
      // this.$emit(CHANGE_NOTEBOOK, notebookId);

      // return this.$router.push({
      //   path: `/note?notebookId=${notebookId}`,
      // });
    },

    onAddNote() {
      this.$prompt("新建笔记", "", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^[\w\u4e00-\u9fa5]{1,30}$/,
        inputErrorMessage: "笔记标题限制1-30字符长度",
      }).then(({ value }) => {
        this.addNote({ curBookId: this.curBookId, title: value });
      });
    },
    changeNote(noteId) {
      this.$emit("changeNote", noteId);
    },
  },
  computed: {
    ...mapGetters(["notebooks", "curBook", "notes", "curBookId"]),
  },
};
</script>

<style lang="stylus">

.note-sidebar {
  position: relative;
  width: 290px;
  border-right: 1px solid #ccc;
  background-color: #eee;

  .add-note {
    position: absolute;
    right: 5px;
    top: 12px;
    color: #666;
    font-size: 12px;
    padding: 2px 4px;
    box-shadow: 0px 0px 2px 0px #ccc;
    border: none;
    z-index: 1;
  }

  .notebook-title{
    font-size: 18px;
    font-weight: normal;
    color: #333;
    height: 45px;
    line-height: 45px;
    text-align: center;
    border-bottom: 1px solid #ccc;
    background-color: #f7f7f7;
    display: block;
  }
  .el-dropdown-link{
    cursor: pointer;
    .icon-down:before {
      display inline-block
      transform rotate(180deg)
      transition transform .3s
    }
  }

  .el-dropdown-link:hover .icon-down:before{
    display inline-block
    transform rotate(0deg)
  }

  .el-dropdown-menu__item{
    width: 200px;
  }

  .menu {
    display: flex;

    div {
      font-size: 12px;
      padding: 2px 10px;
      flex: 1;
      border-right: 1px solid #ccc;
      border-bottom: 1px solid #ccc;

      &:last-child {
        border-right: none;
      }
    }

    .iconfont{
      font-size: 10px;
    }
  }

  .notes {
    li {

      &:nth-child(odd) {
        background-color: #f2f2f2;
      }

      a {
        display: flex;
        padding: 3px 0;
        font-size: 12px;
        border: 2px solid transparent;
      }

      .router-link-exact-active {
        border: 2px solid #81c0f3;
        border-radius: 3px;
      }

      span {
        padding: 0 10px;
        flex: 1;
      }
    }
  }
}
</style>

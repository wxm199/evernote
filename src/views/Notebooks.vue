<template>
  <div class="wrapper">
    <header><button @click="onCreate">新建笔记本</button></header>

    <main>
      <div class="layout">
        <h3>笔记本列表({{ notebooks.length || 0 }})</h3>
        <ul class="notebooks">
          <li v-for="(notebook, index) in notebooks" :key="index">
            <router-link :to="`/note?notebookId=${notebook.id}`"
              ><i class="iconfont icon-notebook"></i>
              <span class="title">{{ notebook.title }}</span
              ><span class="counts">({{ notebook.noteCounts || 0 }})</span
              ><span class="create-date">{{ notebook.friendlyCreatedAt }}</span
              ><span @click.stop.prevent="onDelete(index, notebook.id)"
                >删除</span
              ><span @click.stop.prevent="onEdit(notebook)"
                >编辑</span
              ></router-link
            >
          </li>
        </ul>
      </div>
    </main>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { auth } from "@/apis/auth";
export default {
  methods: {
    ...mapActions(["addNotebook", "delNotebook", "editNotebook"]),
    onCreate() {
      this.$prompt("新建笔记本", "", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^.{1,30}$/,
        inputErrorMessage: "笔记本名称长度1-30个字符",
      }).then(({ value }) => this.addNotebook(value));
    },
    onDelete(index, id) {
      this.$confirm("是否删除？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => this.delNotebook({ index, id }))
        .then((res) => {
          this.$message.success({ message: res.msg });
        });
    },
    onEdit(notebook) {
      this.$prompt("编辑", "", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^.{1,30}$/,
        inputErrorMessage: "笔记本名称长度1-30个字符",
        inputValue: notebook.title,
      })
        .then(({ value }) =>
          this.editNotebook({ notebookId: notebook.id, newTitle: value })
        )
        .then((res) => {
          this.$message.success({ message: res.msg });
        });
    },
  },
  computed: {
    ...mapGetters(["notebooks"]),
  },
  created() {
    auth()
      .then((res) => {
        if (!res.isLogin) {
          this.$router.push({ path: "/login" });
        } else {
          this.getAllNotebooks();
        }
      })
      .catch((e) => console.log(e));
  },
};
</script>

<style lang="stylus" scoped>
.wrapper
  flex 1
  header
    padding 12px
    border-bottom 1px solid #ccc
    button
      position relative
      border none
      box-shadow 1px 1px 1px 1px #ccc
      margin-left 10px
      padding 5px
      padding-left 20px
      font-size: 12px;
      background #fff
      color: #666;
      cursor pointer
      &:active
        box-shadow -1px -1px 1px 1px #ccc


      &::before,&::after
        content ''
        position absolute
        width 10px
        height 1px
        background #666;
        left: 6px;
        top: 13px;
      &::before
        transform: rotate(90deg)
      &::after
        transform: rotate(180deg)
  main
    padding 20px 30px
    height calc(100% - 52px)
    overflow auto
    .layout
      max-width 966px
      margin 0 auto
      h3
        font-size: 12px;
        color: #000;
      ul.notebooks
        margin-top 10px
        background white
        border-radius 3px

        a
          display flex

          padding 12px 14px
          border-bottom 1px solid #ccc
          line-height 16px;
          >span
            font-size: 12px;
            font-weight: 700;
            color: #b3c0c8
            margin-right 10px
          span.title
            margin-left 10px
            margin-right 5px
            font-size: 14px;
            font-weight: bold;
            color: #444;
          span.create-date
            margin-left auto
</style>

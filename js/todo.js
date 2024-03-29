/**
 * Created with IntelliJ IDEA.
 * User: TYG
 * Date: 12-12-24
 * Time: 上午11:50
 * To change this template use File | Settings | File Templates.
 */
$(function(){

    /**
     *基本的Todo模型，属性为：content,order,done。
     **/
    var Todo = Backbone.Model.extend({
        // 设置默认的属性
        defaults: {
            content: "空事项",
            done: false
        },
        //确保每一个content都不为空
        initialize: function() {
            if (!this.get("content")) {
                this.set({"content": this.defaults.content});
            }
        },
        // 将一个任务的完成状态置为逆状态
        toggle: function() {
            this.save({done: !this.get("done")});
        },
        //从localStorage中删除一个条目
        clear: function() {
            this.destroy();
        }
    });

    /**
     *Todo的一个集合，数据通过localStorage存储在本地。
     **/
    var TodoList = Backbone.Collection.extend({
        // 设置Collection的模型为Todo
        model: Todo,
        //存储到本地，以todo-backbone命名的空间中
        localStorage: new Store("todo-backbone"),
        //获取所有已经完成的任务数目
        done: function() {
            return this.filter(function(todo) {
                return todo.get("done");
            });
        },
        //获取任务列表中未完成的任务数目
        remaining: function() {
            return this.without.apply(this,this.done());
        },
        //获得下一个任务的排序序号，通过数据库中的记录数加1实现。
        nextOrder: function() {
            if(!this.length) return 1;
            return this.last().get('order') + 1;
        },
        //Backbone内置函数，根据todo对象的加入顺序进行排列
        comparator: function(todo) {
            return todo.get('order');
        }
    });
    var Todos = new TodoList;

    /**
     * 这个view的主要作用是控制任务列表
     */
    var TodoView = Backbone.View.extend({
        tagName: "li",
        className: "todos_list",
        template: _.template($('#item-template').html()),

        //为每一个任务条目绑定事件
        events: {
            "click .check"             : "toggleDone",
            "dblclick label.todo_text" : "edit",
            "click a.close"            : "clear",
            "keypress .edit-input"     : "updateOnEnter",
            "blur .edit-input"         : "close"
        },
        initialize: function() {
            _.bindAll(this,"render","close","remove");
            this.model.bind('change', this.render);
            this.model.bind('destroy', this.remove);
        },
        // 渲染todo中的数据到 item-template 中，然后返回对自己的引用this
        render: function() {
            $(this.el).html(this.template(this.model.toJSON()));
            this.input = this.$(".edit-input");
            return this;
        },
        // 控制任务完成或者未完成
        toggleDone: function() {
            this.model.toggle();
        },
        // 修改任务条目的样式
        edit: function() {
            $(this.el).addClass("editing");
            this.input.focus();
        },
        // 关闭编辑界面，并把修改内容同步到界面
        close: function() {
            this.model.save({
                content: this.input.val()
            });
            $(this.el).removeClass("editing");
        },
        // 按下回车之后，关闭编辑界面
        updateOnEnter: function(e) {
            if(e.keyCode == 13) this.close();
        },
        // 移除对应条目，以及对应的数据对象
        clear: function() {
            this.model.clear();
        }
    });
    /**
     * 这个view的功能是显示所有任务列表
     * 显示整体的列表状态（如：完成多少，未完成多少）
     * 以及任务的添加。主要是整体上的一个控制
     */
    var AppView = Backbone.View.extend({
        el: $("#todo_app"),
        // 在底部显示的统计数据模板
        statsTemplate: _.template($('#stats-template').html()),
        // 绑定dom节点上的事件
        events: {
            "keypress #input_todo":"createOnEnter",
            "click #clear_over"   :"clearCompleted",
            "click #check_all_done"    :"toggleAllComplete"
        },
        initialize: function() {
            //下面这个是underscore库中的方法，用来绑定方法到目前的这个对象中，
            // 是为了在以后运行环境中调用当前对象的时候能够找到对象中的这些方法。
            _.bindAll(this, 'addOne', 'addAll', 'render', 'toggleAllComplete');

            this.input = this.$("#input_todo");
            this.allCheckbox = this.$("#check_all_done")[0];

            Todos.bind('add',   this.addOne);
            Todos.bind('reset', this.addAll);
            Todos.bind('all',   this.render);

            Todos.fetch();
        },
        // 更改当前任务列表的状态
        render: function() {
            var done = Todos.done().length;
            var remaining = Todos.remaining().length;

            this.$('.modal-footer').html(this.statsTemplate({
                total:      Todos.length,
                done:       done,
                remaining:  remaining
            }));
            //根据剩余多少未完成确定标记全部完成的checkbox的显示
            this.allCheckbox.checked = !remaining;
        },
        //添加一个任务到页面id为todo-list的div/ul中
        addOne: function(todo) {
            var view = new TodoView({model: todo});
            this.$("#todo_list").append(view.render().el);
        },
        // 把Todos中的所有数据渲染到页面,页面加载的时候用到
        addAll: function() {
            Todos.each(this.addOne);
        },
        //生成一个新Todo的所有属性的字典
        newAttributes: function() {
            return {
                content: this.input.val(),
                order:   Todos.nextOrder(),
                done:    false
            };
        },
        //创建一个任务的方法，使用backbone.collection的create方法。将数据保存到localStorage,这是一个html5的js库。需要浏览器支持html5才能用。
        // persisting it to *localStorage*.
        createOnEnter: function(e) {
            if (e.keyCode != 13) return;
            Todos.create(this.newAttributes());  //创建一个对象之后会在backbone中动态调用Todos的add方法，该方法已绑定addOne。
            this.input.val('');
        },
        // 去掉所有已经完成的任务
        clearCompleted: function() {
            _.each(Todos.done(), function(todo){ todo.clear(); });
            return false;
        },

        //处理页面点击标记全部完成按钮
        //处理逻辑：如果标记全部按钮已选，则所有都完成，如果未选，则所有的都未完成。
        toggleAllComplete: function () {
            var done = this.allCheckbox.checked;
            Todos.each(function(todo) { todo.save({'done': done}); });
        }
    });

    var App = new AppView;

});


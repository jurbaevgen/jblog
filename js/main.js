$( document ).ready( function() {

    navigation = {
        currentPage: '',
        defaultPage: 'blogPage',
        container: $('.content'),
        navigationContainer: $('.navigation'),
        pages: {
            blogPage: { 
                selector: ".blog", 
                init: function () {
                    blog.init();
                }
            },
            contactPage: {
                selector: ".contactMe"
            },
            aboutPage: {
                selector: ".aboutMe"
            }
        },
        go: function(page) {
            this.hidePages();

            if (!this.pageExist(page))
                return;

            this.showPage(page);
        },
        hidePages: function() {
            this.container.children('div').hide();
            this.navigationContainer.children('li').removeClass('active');
        },
        showPage: function(page) {
            console.log(this.pages);
            currentPage = this.pages[page];
            this.container.children(currentPage.selector).show();

            this.navigationContainer.children(currentPage.selector).addClass('active');

            if (typeof currentPage.init === 'function')
                currentPage.init();
        },
        pageExist: function(page) {
            return typeof this.pages[page] !== 'undefined'
        },
        init: function() {
            this.go(this.defaultPage);
        }
    }
    
    blog = {
        blogData: [],
        blogTemplate: $('.blog > .template'),
        blogContainer: $('.content > .blog'),
        getContent: function(calback) {
            return $.ajax({
                method: "GET",
                url: "/data/blog.json",
                dataType: "json",
                async: true,
                cache: false
            });
        },
        printToPage: function () {
            object = this;
            
            object.blogContainer.empty();
            
            jQuery.each( object.blogData, function(i, blogItemData) {
                blogItem = object.blogTemplate.clone();

                blogItem.find('h2').text(blogItemData.title);
                blogItem.find('.date').text(blogItemData.date);
                blogItem.find('p').html(blogItemData.description);

                blogItem.removeClass('template');

                blogItem.appendTo(object.blogContainer);
            });
        },
        init() {
            object = this;
            blog.getContent().done(function(data) {
                object.blogData = data;
                object.printToPage();
            });
        }
    };

    navigation.init();
});
"use strict";

// This handles the overlay UI on the illustration page.
ppixiv.image_ui = class extends ppixiv.widget
{
    constructor({progress_bar, ...options})
    {
        super({
            ...options,
            visible: false,
            template: `
<div class=ui-box>
    <!-- The avatar icon in the top-right.  This is absolutely positioned, since we don't
            want this to push the rest of the UI down. -->
    <div class="avatar-popup" style="position: absolute; top: 1em; right: 1em;"></div>

    <!-- The title and author.  The margin-right here is to prevent this from
            overlapping the absolutely-positioned avatar icon above. -->
    <div style="display: flex; flex-direction: row; margin-right: 4em;">
        <div>
            <span class="title-block">
                <!-- Put the title and author in separate inline-blocks, to encourage
                        the browser to wrap between them if possible, putting the author
                        on its own line if they won\'t both fit, but still allowing the
                        title to wrap if it\'s too long by itself. -->
                <span style="display: inline-block;" class="title-font">
                    <a class="title"></a>
                </span>
                <span style="display: inline-block;" class="author-block title-font">
                    <span style="font-size: 12px;">by</span>
                    <a class="author"></a>
                </span>
                <a class=edit-post href=#>Edit post</a>
            </span>
        </div>
    </div>

    <div class=button-row>
        <a class="disable-ui-button popup" data-popup="Return to Pixiv" href="#no-ppixiv">
            <ppixiv-inline src="resources/pixiv-icon.svg"></ppixiv-inline>
        </a>

        <div class="navigate-out-button popup" data-popup="Show all">
            <div class="grey-icon icon-button">
                <ppixiv-inline src="resources/thumbnails-icon.svg"></ppixiv-inline>
            </div>
        </div>

        <div class="download-button download-image-button popup" data-download="image" data-popup="Download image">
            <div class="grey-icon icon-button button enabled">
                <ppixiv-inline src="resources/download-icon.svg"></ppixiv-inline>
            </div>
        </div>

        <div class="download-button download-manga-button popup" data-download="ZIP" data-popup="Download ZIP of all images">
            <div class="grey-icon icon-button button enabled">
                <ppixiv-inline src="resources/download-manga-icon.svg"></ppixiv-inline>
            </div>
        </div>

        <div class="download-button download-video-button popup" data-download="MKV" data-popup="Download MKV">
            <div class="grey-icon icon-button button enabled">
                <ppixiv-inline src="resources/download-icon.svg"></ppixiv-inline>
            </div>
        </div>

        <!-- position: relative positions the tag dropdown. -->
        <div style="position: relative;">
            <!-- position: relative positions the bookmark count. -->
            <div class="button button-bookmark public popup" style="position: relative;">
                <ppixiv-inline src="resources/heart-icon.svg"></ppixiv-inline>
                <div class=count></div>
            </div>

            <div class=popup-bookmark-tag-dropdown-container></div>
        </div>

        <div class="button button-bookmark private popup">
            <ppixiv-inline src="resources/heart-icon.svg"></ppixiv-inline>
        </div>
        
        <div style="position: relative;">
            <div class="button button-bookmark-tags grey-icon popup" data-popup="Bookmark tags">
                <ppixiv-inline src="resources/tag-icon.svg"></ppixiv-inline>
                <div style="position: absolute; bottom: 2px; left: 4px;">
                    <div class=tag-dropdown-arrow hidden></div>
                </div>
            </div>
        </div>

        <div class="button button-like enabled popup" style="position: relative;">
            <ppixiv-inline src="resources/like-button.svg"></ppixiv-inline>

            <div class=count></div>
        </div>

        <a class="similar-illusts-button bulb-button popup" data-popup="Similar illustrations" href=#>
            <div class="grey-icon icon-button">
                <ppixiv-inline src="resources/related-illusts.svg"></ppixiv-inline>
            </div>
        </a>

        <a class="similar-artists-button bulb-button grey-icon popup" data-popup="Similar artists" href=#>
            <div class="grey-icon icon-button">
                <ppixiv-inline src="resources/related-illusts.svg"></ppixiv-inline>
            </div>
        </a>

        <a class="similar-bookmarks-button bulb-button grey-icon popup" data-popup="Similar bookmarks" href=#>
            <div class="grey-icon icon-button">
                <ppixiv-inline src="resources/related-illusts.svg"></ppixiv-inline>
            </div>
        </a>

        <div class="image-settings-menu-box settings-menu-box popup" data-popup="Preferences">
            <div class="grey-icon icon-button popup-menu-box-button">
                <ppixiv-inline src="resources/settings-icon.svg"></ppixiv-inline>
            </div>
            <div hidden class=popup-menu-box></div>
        </div>
    </div>
    <div class=post-info>
        <div class="post-age popup" hidden></div>
        <div class=page-count hidden></div>
        <div class=ugoira-duration hidden></div>
        <div class=ugoira-frames hidden></div>
        <div class=image-info hidden></div>
    </div>
    
    <div class="tag-list box-button-row"></div>
    <div class=description></div>
</div>
            `});

        this.clicked_download = this.clicked_download.bind(this);
        this.refresh = this.refresh.bind(this);

        this.progress_bar = progress_bar;

        this.avatar_widget = new avatar_widget({
            container: this.container.querySelector(".avatar-popup"),
            mode: "dropdown",
        });

        this.tag_widget = new tag_widget({
            parent: this.container.querySelector(".tag-list"),
        });

        // Set up hover popups.
        dropdown_menu_opener.create_handlers(this.container);
        
        image_data.singleton().illust_modified_callbacks.register(this.refresh);
        
        this.bookmark_tag_widget = new bookmark_tag_list_widget({
            parent: this,
            container: this.container.querySelector(".popup-bookmark-tag-dropdown-container"),
        });
        this.toggle_tag_widget = new toggle_dropdown_menu_widget({
            parent: this,
            container: this.container.querySelector(".button-bookmark-tags"),
            bookmark_tag_widget: this.bookmark_tag_widget,
            require_image: true,
        });
        this.like_button = new like_button_widget({
            parent: this,
            container: this.container.querySelector(".button-like"),
        });
        this.like_count_widget = new like_count_widget({
            parent: this,
            container: this.container.querySelector(".button-like .count"),
        });
        this.bookmark_count_widget = new bookmark_count_widget({
            parent: this,
            container: this.container.querySelector(".button-bookmark .count"),
        });

        // The bookmark buttons, and clicks in the tag dropdown:
        this.bookmark_buttons = [];
        for(var a of this.container.querySelectorAll(".button-bookmark"))
            this.bookmark_buttons.push(new bookmark_button_widget({
                parent: this,
                container: a,
                private_bookmark: a.classList.contains("private"),
                bookmark_tag_widget: this.bookmark_tag_widget,
            }));

        for(let button of this.container.querySelectorAll(".download-button"))
            button.addEventListener("click", this.clicked_download);
        this.container.querySelector(".download-manga-button").addEventListener("click", this.clicked_download);
        this.container.querySelector(".navigate-out-button").addEventListener("click", function(e) {
            main_controller.singleton.navigate_out();
        }.bind(this));

        var settings_menu = this.container.querySelector(".settings-menu-box > .popup-menu-box");
        menu_option.add_settings(settings_menu);
    }

    visibility_changed()
    {
        super.visibility_changed();

        this.avatar_widget.visible = this.visible;
        if(this.visible)
            this.refresh();
    }

    set data_source(data_source)
    {
        if(this._data_source == data_source)
            return;

        this._data_source = data_source;
        this.refresh();
    }
    
    shutdown()
    {
        image_data.singleton().illust_modified_callbacks.unregister(this.refresh);
        this.avatar_widget.shutdown();
    }

    get illust_id()
    {
        return this._illust_id;
    }

    set illust_id(illust_id)
    {
        if(this._illust_id == illust_id)
            return;

        this._illust_id = illust_id;
        this.illust_data = null;

        this.refresh();
    }

    handle_onkeydown(e)
    {
    }

    async refresh()
    {
        // Don't do anything if we're not visible.
        if(!this.visible)
            return;

        // Update widget illust IDs.
        this.like_button.set_illust_id(this._illust_id, this.displayed_page);
        this.bookmark_tag_widget.set_illust_id(this._illust_id, this.displayed_page);
        this.toggle_tag_widget.set_illust_id(this._illust_id, this.displayed_page);
        this.like_count_widget.set_illust_id(this._illust_id, this.displayed_page);
        this.bookmark_count_widget.set_illust_id(this._illust_id, this.displayed_page);
        for(let button of this.bookmark_buttons)
            button.set_illust_id(this._illust_id, this.displayed_page);
    
        this.illust_data = null;
        if(this._illust_id == null)
            return;

        // We need image info to update.
        let illust_id = this._illust_id;
        let illust_info = await image_data.singleton().get_image_info(illust_id);

        // Check if anything changed while we were loading.
        if(illust_info == null || illust_id != this._illust_id || !this.visible)
            return;

        this.illust_data = illust_info;
        let user_id = illust_info.userId;

        // Show the author if it's someone else's post, or the edit link if it's ours.
        var our_post = global_data.user_id == user_id;
        this.container.querySelector(".author-block").hidden = our_post;
        this.container.querySelector(".edit-post").hidden = !our_post;
        this.container.querySelector(".edit-post").href = "/member_illust_mod.php?mode=mod&illust_id=" + illust_id;

        this.avatar_widget.set_user_id(user_id);
        this.tag_widget.set(illust_info.tagList);

        var element_title = this.container.querySelector(".title");
        element_title.textContent = illust_info.illustTitle;
        element_title.href = "/artworks/" + illust_id + "#ppixiv";

        var element_author = this.container.querySelector(".author");
        element_author.textContent = illust_info.userName;
        element_author.href = `/users/${user_id}#ppixiv`;
        
        this.container.querySelector(".similar-illusts-button").href = "/bookmark_detail.php?illust_id=" + illust_id + "#ppixiv?recommendations=1";
        this.container.querySelector(".similar-artists-button").href = "/discovery/users#ppixiv?user_id=" + user_id;
        this.container.querySelector(".similar-bookmarks-button").href = "/bookmark_detail.php?illust_id=" + illust_id + "#ppixiv";

        // Fill in the post info text.
        this.set_post_info(this.container.querySelector(".post-info"));

        // The comment (description) can contain HTML.
        var element_comment = this.container.querySelector(".description");
        element_comment.hidden = illust_info.illustComment == "";
        element_comment.innerHTML = illust_info.illustComment;
        helpers.fix_pixiv_links(element_comment);
        helpers.make_pixiv_links_internal(element_comment);

        // Set the download button popup text.
        let download_image_button = this.container.querySelector(".download-image-button");
        download_image_button.hidden = !actions.is_download_type_available("image", illust_info);

        let download_manga_button = this.container.querySelector(".download-manga-button");
        download_manga_button.hidden = !actions.is_download_type_available("ZIP", illust_info);

        let download_video_button = this.container.querySelector(".download-video-button");
        download_video_button.hidden = !actions.is_download_type_available("MKV", illust_info);

        // Set the popup for the thumbnails button.
        var navigate_out_label = main_controller.singleton.navigate_out_label;
        var title = navigate_out_label != null? ("Return to " + navigate_out_label):"";
        this.container.querySelector(".navigate-out-button").dataset.popup = title;
    }

    set_post_info(post_info_container)
    {
        var illust_data = this.illust_data;

        var set_info = (query, text) =>
        {
            var node = post_info_container.querySelector(query);
            node.innerText = text;
            node.hidden = text == "";
        };

        var seconds_old = (new Date() - new Date(illust_data.createDate)) / 1000;
        set_info(".post-age", helpers.age_to_string(seconds_old) + " ago");
        post_info_container.querySelector(".post-age").dataset.popup = helpers.date_to_string(illust_data.createDate);

        var info = "";

        // Add the resolution and file type if available.
        if(this.displayed_page != null && this.illust_data != null)
        {
            var page_info = this.illust_data.mangaPages[this.displayed_page];
            info += page_info.width + "x" + page_info.height;
        }

        var ext = this.viewer? this.viewer.current_image_type:null;
        if(ext != null)
            info += " " + ext;

        set_info(".image-info", info);

        var duration = "";
        if(illust_data.illustType == 2)
        {
            var seconds = 0;
            for(var frame of illust_data.ugoiraMetadata.frames)
                seconds += frame.delay / 1000;

            var duration = seconds.toFixed(duration >= 10? 0:1);
            duration += seconds == 1? " second":" seconds";
        }
        set_info(".ugoira-duration", duration);
        set_info(".ugoira-frames", illust_data.illustType == 2? (illust_data.ugoiraMetadata.frames.length + " frames"):"");

        // Add the page count for manga.
        var page_text = "";
        if(illust_data.pageCount > 1 && this.displayed_page != null)
            page_text = "Page " + (this.displayed_page+1) + "/" + illust_data.pageCount;
        set_info(".page-count", page_text);
    }

    // Set the resolution to display in image info.  If both are null, no resolution
    // is displayed.
    set_displayed_page_info(page)
    {
        console.assert(page == null || page >= 0);
        this.displayed_page = page;
        this.refresh();
    }

    clicked_download(e)
    {
        if(this.illust_data == null)
            return;

        var clicked_button = e.target.closest(".download-button");
        if(clicked_button == null)
            return;

        e.preventDefault();
        e.stopPropagation();

        let download_type = clicked_button.dataset.download;
        actions.download_illust(this.illust_id, this.progress_bar.controller(), download_type, this.displayed_page);
    }
 }


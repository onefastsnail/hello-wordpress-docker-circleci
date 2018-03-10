<div class="s-footer">
    <div class="s-footer__container">
        <div class="l-header">
            <div class="l-header__logo">
                <a href="<?php bloginfo('url'); ?>" class="" title="<?php bloginfo('name'); ?>">
                    <?php bloginfo('name'); ?>
                </a>
            </div>
            <div class="l-header__navigation">
                <?php wp_nav_menu(array('container_class' => 'c-navigation', 'menu_class' => 'c-navigation__list', 'theme_location' => 'header-navigation', 'fallback_cb' => false)); ?>
            </div>
        </div>
    </div>
</div>

<?php wp_footer(); ?>
</body>
</html>

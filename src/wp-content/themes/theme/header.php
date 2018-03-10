<!DOCTYPE html>
<html <?php language_attributes(); ?>>
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta charset="<?php bloginfo( 'charset' ); ?>" />
        <link rel="profile" href="http://gmpg.org/xfn/11" />
        <?php wp_head(); ?>
    </head>
<body <?php body_class(); ?>>

<div class="s-header">
    <div class="s-header__container">
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

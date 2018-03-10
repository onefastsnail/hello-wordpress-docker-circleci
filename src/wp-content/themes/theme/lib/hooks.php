<?php

namespace MyTheme\Hooks;

function registerMenus()
{
    register_nav_menus(
        array(
            'header-navigation' => __('Header Navigation'),
            'footer-navigation' => __('Footer Navigation')
        )
    );
}

// navigation
add_action('init', '\MyTheme\Hooks\registerMenus');

// lets hide the admin bar in the
add_filter( 'show_admin_bar', '__return_false' );

// lets add feature image to posts by default
add_theme_support( 'post-thumbnails' );

// add support for title tag by seo plugins etc
add_theme_support( 'title-tag' );

<?php

namespace MyTheme;

function publicScriptsAndStyles() {

    // de-register jquery, since we are manually adding it
    wp_deregister_script( 'jquery' );

    // let's get a specific version of jquery
    wp_enqueue_script( 'jquery', '//ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js', array(), null, false );

    wp_enqueue_script( 'ourquery', get_template_directory_uri().'/assets/dist/js/bundle.'.filemtime(get_stylesheet_directory() . '/assets/dist/js/bundle.js').'.js', array(), null, true );

    wp_enqueue_style( 'ourcss', get_template_directory_uri().'/assets/dist/css/bundle.'.filemtime(get_stylesheet_directory() . '/assets/dist/css/bundle.css').'.css' );

}

// lets hide the admin bar in the
add_filter( 'show_admin_bar', '__return_false' );

// lets add feature image to posts by default
add_theme_support( 'post-thumbnails' );

add_theme_support( 'title-tag' );

add_action( 'wp_enqueue_scripts', 'MyTheme\publicScriptsAndStyles' );
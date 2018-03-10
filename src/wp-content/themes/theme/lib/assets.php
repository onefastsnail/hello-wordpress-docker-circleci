<?php

namespace MyTheme;

function scriptsAndStyles() {

    // de-register jquery, since we are manually adding it
    wp_deregister_script( 'jquery' );

    // let's get a specific version of jquery
    wp_enqueue_script( 'jquery', '//ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js', array(), null, false );

    wp_enqueue_script( 'myjs', get_template_directory_uri().'/assets/dist/js/bundle.'.filemtime(get_stylesheet_directory() . '/assets/dist/js/bundle.js').'.js', array(), null, true );

    wp_enqueue_style( 'mycss', get_template_directory_uri().'/assets/dist/css/bundle.'.filemtime(get_stylesheet_directory() . '/assets/dist/css/bundle.css').'.css' );

}

add_action( 'wp_enqueue_scripts', '\MyTheme\scriptsAndStyles' );

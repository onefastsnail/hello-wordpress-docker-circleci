<?php

get_header();

?>

<section class="section">
    <div class="container">
        <div class="row">
            <div class="col-xs-12">

            <?php get_search_form(); ?>

            <?php if ( have_posts() ) :
                while ( have_posts() ) : the_post(); ?>
                    
                    <p class="c-item"><a href="<?php echo get_the_permalink(); ?>"><?php echo get_the_title(); ?></a></p>
                    
                <?php endwhile;
            endif; ?>
            </div>
        </div><!-- end of row -->
    </div><!-- end of wrapper -->
</section><!-- end of section -->

<?php

get_footer();

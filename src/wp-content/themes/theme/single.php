<?php

get_header();

?>

<section class="section">
    <div class="container">
        <div class="row">
            <div class="col-xs-12">
            <?php if ( have_posts() ) :
                while ( have_posts() ) : the_post(); ?>

                    <h1><a href="<?php echo get_the_permalink(); ?>"><?php echo get_the_title(); ?></a></h1>

                    <?php the_content(); ?>

                <?php endwhile;
            endif; ?>
            </div>
        </div><!-- end of row -->
    </div><!-- end of wrapper -->
</section><!-- end of section -->

<?php

get_footer();

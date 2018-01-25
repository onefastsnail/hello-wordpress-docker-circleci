<?php

get_header();

?>

<section class="section">
    <div class="container">
        <div class="row">
            <div class="col-xs-12">
            <?php if ( have_posts() ) {
                while ( have_posts() ) {
                    the_post();
                    the_title( '<h3>', '</h3>' );
                    the_content();
                }
            } ?>
            </div>
        </div><!-- end of row -->
    </div><!-- end of wrapper -->
</section><!-- end of section -->

<?php 

get_footer();
<template>
    <div>
        <md-toolbar>
            <img src="../assets/collegefocus_60.png" class="image-toolbar" alt="college" />
            <span class="md-title content-magin-bottom">CollegeFocus</span>
        </md-toolbar>
        <md-layout md-row md-align="center" class="marginal">
            <md-layout md-column md-tag="md-card" class="card-container" md-flex="40" md-flex-medium="60" md-flex-small="80" md-flex-xsmall="90" md-align="center">
                <md-card-header>
                    <p class="md-title page-header">Confirm Registration</p>
                </md-card-header>
                <md-card-content>
                    <md-input-container>
                        <label>School Code</label>
                        <md-input></md-input>
                    </md-input-container>
    
                    <md-input-container>
                        <label>Username</label>
                        <md-input></md-input>
                    </md-input-container>
    
                    <md-input-container>
                        <label>Token</label>
                        <md-input></md-input>
                    </md-input-container>
    
                </md-card-content>
                <md-card-actions>
                    <md-layout md-column md-flex="100" md-flex-medium="100" md-flex-small="100" md-flex-xsmall="100">
                        <md-button md-theme="default" type="submit" class="md-raised md-accent round-button">Confirm</md-button>
                    </md-layout>
                </md-card-actions>
            </md-layout>
        </md-layout>
    
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>

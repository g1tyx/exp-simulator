//updating the color of the level bar
function color_update() {
    if (!meme) {
        if (game.level < 60) {
            document.getElementById("lvlnum").style.color = get_color(
                Math.floor(game.level / 10)
            )
            document.getElementById("progress").style.background = get_color(
                Math.floor(game.level / 10)
            )
        } else if (game.level < 12000) {
            document.getElementById("lvlnum").style.color = get_color(
                (Math.floor(game.level / 60) + 5) % 12
            )
            document.getElementById("progress").style.background = get_color(
                (Math.floor(game.level / 60) + 5) % 12
            )
        } else if (game.level < 60000) {
            document.getElementById("lvlnum").style.color = get_color(
                (Math.floor(game.level / 300) - 3) % 12
            )
            document.getElementById("progress").style.background = get_color(
                (Math.floor(game.level / 300) - 3) % 12
            )
        } else {
            document.getElementById("lvlnum").style.color = get_color(
                (Math.floor(game.level / 1200) + 3) % 12
            )
            document.getElementById("progress").style.background = get_color(
                (Math.floor(game.level / 1200) + 3) % 12
            )
        }
    }
}

//updating level related stuff
function level_update() {
    if (game.level < game.pr_min || game.pp_bought[6]) {
        if (game.epilepsy) {
            document.getElementById("progress").style.width =
                game.exp.div(game.goal).mul(100).clamp(0, 100) + "%"
        } else {
            let eps = game.global_multiplier
                .mul(game.exp_add + game.exp_fluct / 2)
                .mul(game.cap_boost)
                .mul(
                    game.cps *
                        game.au_boost *
                        game.exp_battery ** game.battery_charge
                )
            if (
                (game.autods_toggle && game.autods_goal === 0) ||
                (game.autods_goal === -1 &&
                    game.cap_mode === 4 &&
                    (!game.smartds_oc ||
                        (game.smartds_oc && game.oc_state === 2)))
            )
                eps = game.global_multiplier
                    .mul(game.exp_add + game.exp_fluct / 2)
                    .mul(game.cap_boost + (1 - game.cap_boost) * game.ds_boost)
                    .mul(
                        game.cps *
                            game.au_boost *
                            game.exp_battery ** game.battery_charge
                    )
            if (eps.div(game.goal).cmp(2) >= 0) {
                document.getElementById("progress").style.width = 100 + "%"
            } else {
                document.getElementById("progress").style.width =
                    game.exp.div(game.goal).mul(100).clamp(0, 100) + "%"
            }
        }
    } else {
        document.getElementById("progress").style.width = 100 + "%"
        if (!game.pp_bought[6] && game.level >= game.pr_min) {
            game.all_time_exp = game.all_time_exp.sub(
                game.total_exp.sub(get_exp(game.pr_min - 1).ceil())
            )
            game.reboot_exp = game.reboot_exp.sub(
                game.total_exp.sub(get_exp(game.pr_min - 1).ceil())
            )
            game.prestige_exp = game.prestige_exp.sub(
                game.total_exp.sub(get_exp(game.pr_min - 1).ceil())
            )
            game.total_exp = get_exp(game.pr_min - 1).ceil()
            game.level = game.pr_min

            game.exp = game.total_exp.sub(get_exp(game.level - 1).ceil())
            game.goal = get_exp(game.level)
                .sub(get_exp(game.level - 1))
                .ceil()
        }
    }

    if (
        game.pp_progress &&
        (game.prestige >= 1 || game.reboot >= 1 || game.quantum >= 1)
    ) {
        let goal2 = new Decimal(0)
        if (game.pp_bought[6]) {
            if (game.prestige < 21) {
                if (game.level < 60) {
                    document.getElementById("pp_progress").style.width =
                        game.total_exp
                            .div(get_exp(59))
                            .mul(100)
                            .clamp(0, 100)
                            .toNumber() + "%"
                    goal2 = get_exp(59)
                } else {
                    if (game.level < game.highest_level + 1) {
                        let goal = get_exp(
                            Math.ceil(
                                20 *
                                    (get_pp(game.highest_level) + 2) **
                                        (1 / 2) +
                                    40
                            ) - 1
                        ).sub(get_exp(59))
                        let prog = game.total_exp.sub(get_exp(59))
                        document.getElementById("pp_progress").style.width =
                            prog.div(goal).mul(100).clamp(0, 100).toNumber() +
                            "%"
                        goal2 = goal
                    } else {
                        let goal = get_exp(
                            Math.ceil(
                                20 * (get_pp(game.level) + 2) ** (1 / 2) + 40
                            ) - 1
                        ).sub(
                            get_exp(
                                Math.ceil(
                                    20 * (get_pp(game.level) + 1) ** (1 / 2) +
                                        40
                                ) - 1
                            )
                        )
                        let prog = game.total_exp.sub(
                            get_exp(
                                Math.ceil(
                                    20 * (get_pp(game.level) + 1) ** (1 / 2) +
                                        40
                                ) - 1
                            )
                        )
                        document.getElementById("pp_progress").style.width =
                            prog.div(goal).mul(100).clamp(0, 100).toNumber() +
                            "%"
                        goal2 = goal
                    }
                }
            } else {
                if (game.level < game.highest_level + 1) {
                    let goal = get_exp(
                        Math.ceil(
                            20 * (get_pp(game.highest_level) + 2) ** (1 / 2) +
                                40
                        ) - 1
                    )
                    let prog = game.total_exp
                    document.getElementById("pp_progress").style.width =
                        prog.div(goal).mul(100).clamp(0, 100).toNumber() + "%"
                    goal2 = goal
                } else {
                    let goal = get_exp(
                        Math.ceil(
                            20 * (get_pp(game.level) + 2) ** (1 / 2) + 40
                        ) - 1
                    ).sub(
                        get_exp(
                            Math.ceil(
                                20 * (get_pp(game.level) + 1) ** (1 / 2) + 40
                            ) - 1
                        )
                    )
                    let prog = game.total_exp.sub(
                        get_exp(
                            Math.ceil(
                                20 * (get_pp(game.level) + 1) ** (1 / 2) + 40
                            ) - 1
                        )
                    )
                    document.getElementById("pp_progress").style.width =
                        prog.div(goal).mul(100).clamp(0, 100).toNumber() + "%"
                    goal2 = goal
                }
            }
        } else {
            document.getElementById("pp_progress").style.width =
                game.total_exp
                    .div(get_exp(59))
                    .mul(100)
                    .clamp(0, 100)
                    .toNumber() + "%"
            goal2 = get_exp(59)
        }
        if (!game.epilepsy) {
            let eps = game.global_multiplier
                .mul(game.exp_add + game.exp_fluct / 2)
                .mul(game.cap_boost)
                .mul(
                    game.cps *
                        game.au_boost *
                        game.exp_battery ** game.battery_charge
                )
            if (
                (game.autods_toggle && game.autods_goal === 0) ||
                (game.autods_goal === -1 &&
                    game.cap_mode === 4 &&
                    (!game.smartds_oc ||
                        (game.smartds_oc && game.oc_state === 2)))
            )
                eps = game.global_multiplier
                    .mul(game.exp_add + game.exp_fluct / 2)
                    .mul(game.cap_boost + (1 - game.cap_boost) * game.ds_boost)
                    .mul(
                        game.cps *
                            game.au_boost *
                            game.exp_battery ** game.battery_charge
                    )
            if (eps.div(goal2).cmp(2) >= 0) {
                document.getElementById("pp_progress").style.width = "100%"
            }
        }
    }

    if (game.notation === 8) {
        document.getElementById("progress").style.width = "100%"
        document.getElementById("pp_progress").style.width = "100%"
    }

    document.getElementById("lvlnum").innerHTML = format_lvl(game.level)
    if (game.level < 60 || game.pp_bought[6])
        document.getElementById("exp").innerHTML =
            format_infinity(game.exp) +
            "经验值，升级需" +
            format_infinity(game.goal) +
            "经验值"
    else document.getElementById("exp").innerHTML = "Maxed!"

    if (game.priority_layer === 2) {
        document.getElementById("total_exp").innerHTML =
            format_infinity(game.prestige_exp) + "总经验值"
    } else if (game.priority_layer === 1) {
        document.getElementById("total_exp").innerHTML =
            format_infinity(game.total_exp) + "总经验值"
    } else {
        if (game.reboot >= 1 || game.quantum >= 1) {
            document.getElementById("total_exp").innerHTML =
                format_infinity(game.prestige_exp) + "总经验值"
        } else {
            document.getElementById("total_exp").innerHTML =
                format_infinity(game.total_exp) + "总经验值"
        }
    }
}

//updating text on the exp button
function click_update() {
    if (
        (game.fluct_tier === 0 &&
            game.starter_kit + game.generator_kit === 0) ||
        game.challenge === 7 ||
        game.global_multiplier.cmp(0) === 0
    ) {
        document.getElementById("click").innerHTML =
            "+" +
            format_infinity(game.global_multiplier.mul(game.exp_add).round()) +
            "经验值"
    } else if (
        game.fluct_tier >= 1 ||
        game.starter_kit + game.generator_kit >= 1
    ) {
        document.getElementById("click").innerHTML =
            "+" +
            format_range_infinity(
                game.global_multiplier.mul(game.exp_add).round(),
                game.global_multiplier
                    .mul(game.exp_add + game.exp_fluct)
                    .round()
            ) +
            "经验值"
        if (game.range_mode === 1)
            document.getElementById("click").innerHTML =
                "+" +
                format_range_infinity(
                    game.global_multiplier.mul(game.exp_add).round(),
                    game.global_multiplier
                        .mul(game.exp_add + game.exp_fluct)
                        .round()
                ) +
                "经验值(平均)"
    }
}

//updating text on the prestige button
function reset_button_update() {
    if (game.priority_layer === 1) {
        document.getElementById("amp_area").style.display = "block"

        if (game.level >= game.pr_min || game.amp > 1) {
            document.getElementById("amp_up").style.display = "inline"
            document.getElementById("pp_up").style.display = "inline"
            document.getElementById("amp_button").style.display = "inline"
            document.getElementById("amp").innerHTML =
                format_num(game.amp) + "放大倍率"
            document.getElementById("pp").innerHTML =
                format_num(game.pp) + "转生点"
            document.getElementById("amp").style.display = "block"
            document.getElementById("pp").style.display = "block"
        } else {
            document.getElementById("amp_button").style.display = "none"
            document.getElementById("amp").style.display = "none"
            document.getElementById("pp").style.display = "none"
        }

        if (game.challenge !== 4) {
            if (game.level >= game.pr_min) {
                document.getElementById("amp_up").style.display = "inline"
                document.getElementById("amp_up").innerHTML =
                    "+" +
                    format_num(
                        Math.floor(
                            get_amp(game.level) *
                                game.patience *
                                game.watt_boost
                        )
                    ) +
                    "放大倍率"
                if (game.challenge === 9)
                    document.getElementById("amp_up").innerHTML =
                        "+" + format_num(0) + "放大倍率"
                let pp_amount = 0
                if (game.level > game.highest_level) {
                    if (game.prestige <= 21)
                        pp_amount =
                            get_pp(game.level) - get_pp(game.highest_level) + 1
                    else
                        pp_amount =
                            get_pp(game.level) - get_pp(game.highest_level)
                } else {
                    if (game.prestige <= 21) pp_amount = 1
                    else pp_amount = 0
                }
                document.getElementById("pp_up").innerHTML =
                    "+" + format_num(pp_amount) + "转生点"
                if (
                    (pp_amount >= 1 || game.notation === 8) &&
                    (!game.perks[28] || game.challenge === 6)
                ) {
                    document.getElementById("pp_up").style.display = "inline"
                } else {
                    document.getElementById("pp_up").style.display = "none"
                }
                document.getElementById("amp_button").innerHTML = "PRESTIGE!"
                if (!meme)
                    document.getElementById("amp_button").style.color = "white"
                else document.getElementById("amp_button").disabled = false
                document.getElementById("amp_button").style.cursor = "pointer"
            } else {
                document.getElementById("amp_up").style.display = "none"
                document.getElementById("pp_up").style.display = "none"
                document.getElementById("amp_button").innerHTML =
                    "需" + format_lvl(game.pr_min) + "级"
                if (!meme)
                    document.getElementById("amp_button").style.color =
                        get_color((Math.floor(game.pr_min / 60) + 5) % 12)
                else document.getElementById("amp_button").disabled = true
                document.getElementById("amp_button").style.cursor = "default"
            }
        } else {
            if (game.level >= game.highest_level) {
                let amp_amount =
                    get_amp(game.level) - get_amp(game.highest_level)
                document.getElementById("amp_up").style.display = "inline"
                document.getElementById("amp_up").innerHTML =
                    "+" +
                    format_num(Math.floor(amp_amount * game.watt_boost)) +
                    "放大倍率"
                let pp_amount = 0
                if (game.prestige <= 21)
                    pp_amount =
                        get_pp(game.level) - get_pp(game.highest_level) + 1
                else pp_amount = get_pp(game.level) - get_pp(game.highest_level)
                document.getElementById("pp_up").innerHTML =
                    "+" + format_num(pp_amount) + "转生点"
                if (
                    (pp_amount >= 1 || game.notation === 8) &&
                    !game.perks[28]
                ) {
                    document.getElementById("pp_up").style.display = "inline"
                } else {
                    document.getElementById("pp_up").style.display = "none"
                }
                document.getElementById("amp_button").innerHTML = "PRESTIGE!"
                if (!meme)
                    document.getElementById("amp_button").style.color = "white"
                else document.getElementById("amp_button").disabled = false
                document.getElementById("amp_button").style.cursor = "pointer"
            } else {
                document.getElementById("amp_up").style.display = "none"
                document.getElementById("pp_up").style.display = "none"
                document.getElementById("amp_button").innerHTML =
                    "需" + format_lvl(game.highest_level) + "级"

                if (!meme) {
                    if (game.highest_level < 12000) {
                        document.getElementById("amp_button").style.color =
                            get_color(
                                (Math.floor(game.highest_level / 60) + 5) % 12
                            )
                    } else if (game.highest_level < 60000) {
                        document.getElementById("amp_button").style.color =
                            get_color(
                                (Math.floor(game.highest_level / 300) - 3) % 12
                            )
                    } else {
                        document.getElementById("amp_button").style.color =
                            get_color(
                                (Math.floor(game.highest_level / 1200) + 3) % 12
                            )
                    }
                } else document.getElementById("amp_button").disabled = true
                document.getElementById("amp_button").style.cursor = "default"
            }
        }
    } else {
        document.getElementById("amp_area").style.display = "none"
        document.getElementById("amp").style.display = "none"
        document.getElementById("pp").style.display = "none"
    }

    if (game.priority_layer === 2) {
        document.getElementById("reboot_area").style.display = "block"
        document.getElementById("watts2").style.display = "block"
        if (game.watts === 1)
            document.getElementById("watts2").innerHTML =
                format_num(game.watts) + "瓦特"
        else
            document.getElementById("watts2").innerHTML =
                format_num(game.watts) + "瓦特"
        if (game.perks[23] || game.quantum >= 1)
            document.getElementById("hydrogen3").style.display = "block"
        else document.getElementById("hydrogen3").style.display = "none"
        document.getElementById("hydrogen3").innerHTML =
            format_eff(game.hydrogen) + "克氢"

        let all_pp_upgrades = true
        for (const upgrade2 of pp_upgrade.upgrades) {
            if (
                upgrade2.id < 39 &&
                upgrade2.id !== 8 &&
                !game.pp_bought[upgrade2.id]
            )
                all_pp_upgrades = false
        }

        let reboot_requirement = 0
        if (game.reboot >= 1 || game.quantum >= 1)
            reboot_requirement = 5000 * game.reboot + 80000
        if (game.reboot >= 24 || game.quantum >= 1) reboot_requirement = 200000

        if (game.qu_bought[2]) {
            if (game.challenge !== 0 && !entering) {
                if (game.prev_completions < 12) {
                    reboot_requirement =
                        challenge.challenges[game.challenge - 1].goal +
                        challenge.challenges[game.challenge - 1].step *
                            game.prev_completions +
                        (challenge.challenges[game.challenge - 1].step2 *
                            (game.prev_completions - 1) *
                            game.prev_completions) /
                            2
                } else {
                    if (game.dk_bought[3]) {
                        if (game.prev_completions < 20) {
                            reboot_requirement =
                                challenge.challenges[game.challenge - 1].goal2 +
                                challenge.challenges[game.challenge - 1].step3 *
                                    (game.prev_completions - 12) +
                                (challenge.challenges[game.challenge - 1]
                                    .step4 *
                                    (game.prev_completions - 13) *
                                    (game.prev_completions - 12)) /
                                    2
                        } else {
                            reboot_requirement =
                                challenge.challenges[game.challenge - 1].goal2 +
                                challenge.challenges[game.challenge - 1].step3 *
                                    7 +
                                challenge.challenges[game.challenge - 1].step4 *
                                    21
                        }
                    } else {
                        reboot_requirement =
                            challenge.challenges[game.challenge - 1].goal +
                            challenge.challenges[game.challenge - 1].step * 11 +
                            challenge.challenges[game.challenge - 1].step2 * 55
                    }
                }
            }
        } else {
            if (game.challenge !== 0 && !entering) {
                if (game.completions[game.challenge - 1] < 12) {
                    reboot_requirement =
                        challenge.challenges[game.challenge - 1].goal +
                        challenge.challenges[game.challenge - 1].step *
                            game.completions[game.challenge - 1] +
                        (challenge.challenges[game.challenge - 1].step2 *
                            (game.completions[game.challenge - 1] - 1) *
                            game.completions[game.challenge - 1]) /
                            2
                } else {
                    if (game.dk_bought[3]) {
                        if (game.completions[game.challenge - 1] < 20) {
                            reboot_requirement =
                                challenge.challenges[game.challenge - 1].goal2 +
                                challenge.challenges[game.challenge - 1].step3 *
                                    (game.completions[game.challenge - 1] -
                                        12) +
                                (challenge.challenges[game.challenge - 1]
                                    .step4 *
                                    (game.completions[game.challenge - 1] -
                                        13) *
                                    (game.completions[game.challenge - 1] -
                                        12)) /
                                    2
                        } else {
                            reboot_requirement =
                                challenge.challenges[game.challenge - 1].goal2 +
                                challenge.challenges[game.challenge - 1].step3 *
                                    7 +
                                challenge.challenges[game.challenge - 1].step4 *
                                    21
                        }
                    } else {
                        reboot_requirement =
                            challenge.challenges[game.challenge - 1].goal +
                            challenge.challenges[game.challenge - 1].step * 11 +
                            challenge.challenges[game.challenge - 1].step2 * 55
                    }
                }
            }
        }

        if (all_pp_upgrades && game.pp >= reboot_requirement) {
            document.getElementById("watt_button").className =
                "button reboot_power"
            document.getElementById("watts_up").style.display = "inline"
            if (meme) document.getElementById("watt_button").disabled = false
            if (!game.perks[13]) {
                if (
                    game.notation !== 8 &&
                    game.prism_level === 0 &&
                    game.om_boost[0] === 1
                )
                    document.getElementById("watts_up").innerHTML =
                        "+" +
                        format_num(game.prism_boost * game.om_boost[0]) +
                        "瓦特"
                else
                    document.getElementById("watts_up").innerHTML =
                        "+" +
                        format_num(game.prism_boost * game.om_boost[0]) +
                        "瓦特"
            } else {
                if (
                    get_watts(game.pp) * game.prism_boost * game.om_boost[0] ===
                        1 &&
                    game.notation !== 8
                )
                    document.getElementById("watts_up").innerHTML =
                        "+" +
                        format_num(
                            get_watts(game.pp) *
                                game.prism_boost *
                                game.om_boost[0]
                        ) +
                        "瓦特"
                else
                    document.getElementById("watts_up").innerHTML =
                        "+" +
                        format_num(
                            get_watts(game.pp) *
                                game.prism_boost *
                                game.om_boost[0]
                        ) +
                        "瓦特"
                if (
                    game.perks[23] &&
                    (game.watts >= 98304 || game.dk_bought[5])
                ) {
                    document.getElementById("hydrogen_up").style.display =
                        "inline"
                    document.getElementById("hydrogen_up").innerHTML =
                        "+" +
                        format_eff(
                            (get_watts(game.pp) / 100) *
                                2 ** game.supply_level *
                                game.prism_boost
                        ) +
                        "克氢"
                    if (game.perks[26])
                        document.getElementById("hydrogen_up").innerHTML =
                            "+" +
                            format_eff(
                                (get_watts(game.pp) / 100) *
                                    2.5 ** game.supply_level *
                                    game.prism_boost
                            ) +
                            "克氢"
                    if (game.dk_bought[5])
                        document.getElementById("hydrogen_up").innerHTML =
                            "+" +
                            format_eff(
                                (get_watts(game.pp) / 100) *
                                    3 ** game.supply_level *
                                    game.prism_boost
                            ) +
                            "克氢"
                }
            }
        } else {
            document.getElementById("watt_button").className =
                "button no_reboot_power"
            document.getElementById("watts_up").style.display = "none"
            document.getElementById("hydrogen_up").style.display = "none"
            if (meme) document.getElementById("watt_button").disabled = true
        }
    } else {
        document.getElementById("reboot_area").style.display = "none"
        document.getElementById("watts2").style.display = "none"
        document.getElementById("hydrogen3").style.display = "none"
    }

    if (game.priority_layer === 3) {
        document.getElementById("quantum_area").style.display = "block"
        document.getElementById("photons2").style.display = "block"
        if (game.photons.cmp(1) === 0)
            document.getElementById("photons2").innerHTML =
                format_infinity(game.photons) + "光子"
        else
            document.getElementById("photons2").innerHTML =
                format_infinity(game.photons) + "光子"

        let all_pp_upgrades = true
        for (const upgrade2 of pp_upgrade.upgrades) {
            if (
                upgrade2.id < 39 &&
                upgrade2.id !== 8 &&
                !game.pp_bought[upgrade2.id]
            )
                all_pp_upgrades = false
        }

        let total_completions =
            game.completions[0] +
            game.completions[1] +
            game.completions[2] +
            game.completions[3] +
            game.completions[4] +
            game.completions[5] +
            game.completions[6] +
            game.completions[7] +
            game.completions[8]

        let highest_level = game.reboot_highest_level
        if (game.highest_level > highest_level)
            highest_level = game.highest_level
        if (game.level > highest_level) highest_level = game.level

        let amount = Math.floor(1000000 ** ((highest_level - 65536) / 32768))

        if (total_completions >= 108 && highest_level >= 65536) {
            document.getElementById("photon_button").className = "button lit"
            document.getElementById("photons_up2").style.display = "inline"
            if (meme) document.getElementById("photon_button").disabled = false

            if (amount === 1 && game.notation !== 8)
                document.getElementById("photons_up2").innerHTML =
                    "+" + format_num(amount) + "光子"
            else
                document.getElementById("photons_up2").innerHTML =
                    "+" + format_num(amount) + "光子"
        } else {
            document.getElementById("photon_button").className = "button unlit"
            document.getElementById("photons_up2").style.display = "none"
            if (meme) document.getElementById("photon_button").disabled = true
        }
    } else {
        document.getElementById("quantum_area").style.display = "none"
        document.getElementById("photons2").style.display = "none"
    }

    if (game.prestige >= 1 || game.reboot >= 1 || game.quantum >= 1) {
        document.getElementById("prestige").style.display = "inline"
    }
}

//updating whether or not upgrades are visible
//and updating the button text/color
function upgrade_update() {
    //exp boost
    document.getElementById("boost").style.display = "block"
    document.getElementById("boost_button").style.display = "inline"
    if (game.pp_bought[2])
        document.getElementById("boost_auto").style.display = "inline"
    if (game.boost_level < game.pr_min || game.pp_bought[6]) {
        if (game.level >= game.boost_level) {
            document.getElementById("boost_button").innerHTML = "UPGRADE!"
            if (!meme)
                document.getElementById("boost_button").style.color = "#ffffff"
            else document.getElementById("boost_button").disabled = false
            document.getElementById("boost_button").style.cursor = "pointer"
        } else {
            document.getElementById("boost_button").innerHTML =
                "需" + format_lvl(game.boost_level) + "级"
            if (!meme) {
                if (game.boost_level < 60) {
                    document.getElementById("boost_button").style.color =
                        get_color(Math.floor(game.boost_level / 10))
                } else if (game.boost_level < 12000) {
                    document.getElementById("boost_button").style.color =
                        get_color((Math.floor(game.boost_level / 60) + 5) % 12)
                } else if (game.boost_level < 60000) {
                    document.getElementById("boost_button").style.color =
                        get_color((Math.floor(game.boost_level / 300) - 3) % 12)
                } else {
                    document.getElementById("boost_button").style.color =
                        get_color(
                            (Math.floor(game.boost_level / 1200) + 3) % 12
                        )
                }
            }
            document.getElementById("boost_button").style.cursor = "default"
            if (meme) document.getElementById("boost_button").disabled = true
        }
    } else {
        document.getElementById("boost_button").innerHTML = "MAXED"
        if (!meme)
            document.getElementById("boost_button").style.color = "#ffffff"
        else document.getElementById("boost_button").disabled = true
        document.getElementById("boost_button").style.cursor = "default"
    }
    document.getElementById("boost").innerHTML =
        "EXP Boost<br>阶层" +
        format_num(game.boost_tier + game.starter_kit + game.generator_kit) +
        "：每次点击+" +
        format_infinity(
            game.global_multiplier.mul(game.exp_add).mul(game.cap_boost).round()
        ) +
        "经验值"
    if (
        (game.autods_toggle && game.autods_goal === 0) ||
        (game.autods_goal === -1 &&
            game.cap_mode === 4 &&
            (!game.smartds_oc || (game.smartds_oc && game.oc_state === 2)))
    )
        document.getElementById("boost").innerHTML =
            "EXP Boost<br>阶层" +
            format_num(
                game.boost_tier + game.starter_kit + game.generator_kit
            ) +
            "：每次点击+" +
            format_infinity(
                game.global_multiplier
                    .mul(game.exp_add + game.exp_fluct / 2)
                    .mul(game.cap_boost + (1 - game.cap_boost) * game.ds_boost)
                    .round()
            ) +
            "经验值"
    if (game.challenge === 7)
        document.getElementById("boost").innerHTML =
            "EXP Boost<br>阶层" +
            format_num(
                game.boost_tier + game.starter_kit + game.generator_kit
            ) +
            "：每次点击+" +
            format_infinity(game.global_multiplier.mul(game.exp_add).round()) +
            "经验值"

    //autoclicker
    document.getElementById("auto").style.display = "block"
    document.getElementById("auto_button").style.display = "inline"
    if (game.pp_bought[2])
        document.getElementById("auto_auto").style.display = "inline"
    if (game.auto_level < game.pr_min || game.pp_bought[6]) {
        if (game.level >= game.auto_level) {
            document.getElementById("auto_button").innerHTML = "UPGRADE!"
            if (!meme)
                document.getElementById("auto_button").style.color = "#ffffff"
            else document.getElementById("auto_button").disabled = false
            document.getElementById("auto_button").style.cursor = "pointer"
        } else {
            document.getElementById("auto_button").innerHTML =
                "需" + format_lvl(game.auto_level) + "级"
            if (!meme) {
                if (game.auto_level < 60) {
                    document.getElementById("auto_button").style.color =
                        get_color(Math.floor(game.auto_level / 10))
                } else if (game.auto_level < 12000) {
                    document.getElementById("auto_button").style.color =
                        get_color((Math.floor(game.auto_level / 60) + 5) % 12)
                } else if (game.auto_level < 60000) {
                    document.getElementById("auto_button").style.color =
                        get_color((Math.floor(game.auto_level / 300) - 3) % 12)
                } else {
                    document.getElementById("auto_button").style.color =
                        get_color((Math.floor(game.auto_level / 1200) + 3) % 12)
                }
            }
            document.getElementById("auto_button").style.cursor = "default"
            if (meme) document.getElementById("auto_button").disabled = true
        }
    } else {
        document.getElementById("auto_button").innerHTML = "MAXED"
        if (!meme)
            document.getElementById("auto_button").style.color = "#ffffff"
        else document.getElementById("auto_button").disabled = true
        document.getElementById("auto_button").style.cursor = "default"
    }
    document.getElementById("auto").innerHTML =
        "Autoclicker<br>阶层" +
        format_num(game.auto_tier + game.starter_kit + game.generator_kit) +
        "：每秒点击" +
        format_num(game.cps * game.au_boost) +
        "次"
    if (game.pp_bought[24] || game.pp_bought[25])
        document.getElementById("auto").innerHTML =
            "Autoclicker<br>阶层" +
            format_num(game.auto_tier + game.starter_kit + game.generator_kit) +
            "：每秒点击" +
            format_eff(
                game.cps *
                    game.au_boost *
                    game.exp_battery ** game.battery_charge
            ) +
            "次"

    //exp fluctuation
    if (game.pp_bought[0] && game.challenge !== 7) {
        document.getElementById("fluct").style.display = "block"
        document.getElementById("fluct_button").style.display = "inline"
        if (game.pp_bought[2])
            document.getElementById("fluct_auto").style.display = "inline"
    }
    if (game.fluct_level < game.pr_min || game.pp_bought[6]) {
        if (game.level >= game.fluct_level) {
            document.getElementById("fluct_button").innerHTML = "UPGRADE!"
            if (!meme)
                document.getElementById("fluct_button").style.color = "#ffffff"
            else document.getElementById("fluct_button").disabled = false
            document.getElementById("fluct_button").style.cursor = "pointer"
        } else {
            document.getElementById("fluct_button").innerHTML =
                "需" + format_lvl(game.fluct_level) + "级"
            if (!meme) {
                if (game.fluct_level < 60) {
                    document.getElementById("fluct_button").style.color =
                        get_color(Math.floor(game.fluct_level / 10))
                } else if (game.fluct_level < 12000) {
                    document.getElementById("fluct_button").style.color =
                        get_color((Math.floor(game.fluct_level / 60) + 5) % 12)
                } else if (game.fluct_level < 60000) {
                    document.getElementById("fluct_button").style.color =
                        get_color((Math.floor(game.fluct_level / 300) - 3) % 12)
                } else {
                    document.getElementById("fluct_button").style.color =
                        get_color(
                            (Math.floor(game.fluct_level / 1200) + 3) % 12
                        )
                }
            }
            document.getElementById("fluct_button").style.cursor = "default"
            if (meme) document.getElementById("fluct_button").disabled = true
        }
    } else {
        document.getElementById("fluct_button").innerHTML = "MAXED"
        if (!meme)
            document.getElementById("fluct_button").style.color = "#ffffff"
        else document.getElementById("fluct_button").disabled = true
        document.getElementById("fluct_button").style.cursor = "default"
    }
    document.getElementById("fluct").innerHTML =
        "EXP Fluctuation<br>阶层" +
        format_num(game.fluct_tier + game.starter_kit + game.generator_kit) +
        "：每次点击经验值上限+" +
        format_infinity(
            game.global_multiplier
                .mul(game.exp_fluct)
                .mul(game.cap_boost)
                .round()
        ) +
        ""
    if (game.autods_toggle && game.autods_goal === 0)
        document.getElementById("fluct").innerHTML =
            "EXP Fluctuation<br>阶层" +
            format_num(
                game.fluct_tier + game.starter_kit + game.generator_kit
            ) +
            "：每次点击经验值上限+" +
            format_infinity(
                game.global_multiplier
                    .mul(game.exp_fluct)
                    .mul(game.cap_boost + (1 - game.cap_boost) * game.ds_boost)
                    .round()
            ) +
            ""

    //exp factor
    if (game.pp_bought[5] && game.challenge !== 7) {
        document.getElementById("fact").style.display = "block"
        document.getElementById("fact_button").style.display = "inline"
        if (game.pp_bought[2])
            document.getElementById("fact_auto").style.display = "inline"
    }
    if (game.fact_level < game.pr_min || game.pp_bought[6]) {
        if (game.level >= game.fact_level) {
            document.getElementById("fact_button").innerHTML = "UPGRADE!"
            if (!meme)
                document.getElementById("fact_button").style.color = "#ffffff"
            else document.getElementById("fact_button").disabled = false
            document.getElementById("fact_button").style.cursor = "pointer"
        } else {
            document.getElementById("fact_button").innerHTML =
                "需" + format_lvl(game.fact_level) + "级"
            if (!meme) {
                if (game.fact_level < 60) {
                    document.getElementById("fact_button").style.color =
                        get_color(Math.floor(game.fact_level / 10))
                } else if (game.fact_level < 12000) {
                    document.getElementById("fact_button").style.color =
                        get_color((Math.floor(game.fact_level / 60) + 5) % 12)
                } else if (game.fact_level < 60000) {
                    document.getElementById("fact_button").style.color =
                        get_color((Math.floor(game.fact_level / 300) - 3) % 12)
                } else {
                    document.getElementById("fact_button").style.color =
                        get_color((Math.floor(game.fact_level / 1200) + 3) % 12)
                }
            }
            document.getElementById("fact_button").style.cursor = "default"
            if (meme) document.getElementById("fact_button").disabled = true
        }
    } else {
        document.getElementById("fact_button").innerHTML = "MAXED"
        if (!meme)
            document.getElementById("fact_button").style.color = "#ffffff"
        else document.getElementById("fact_button").disabled = true
        document.getElementById("fact_button").style.cursor = "default"
    }
    document.getElementById("fact").innerHTML =
        "EXP Factor<br>阶层" +
        format_num(game.fact_tier + game.starter_kit + game.generator_kit) +
        "：点击经验值变为" +
        format_num(game.exp_fact) +
        "倍"

    //exp flux
    if (game.pp_bought[20] && game.challenge !== 7) {
        document.getElementById("flux").style.display = "block"
        document.getElementById("flux_button").style.display = "inline"
        if (game.pp_bought[2])
            document.getElementById("flux_auto").style.display = "inline"
    }
    if (game.flux_level < game.pr_min || game.pp_bought[6]) {
        if (game.level >= game.flux_level) {
            document.getElementById("flux_button").innerHTML = "UPGRADE!"
            if (!meme)
                document.getElementById("flux_button").style.color = "#ffffff"
            else document.getElementById("flux_button").disabled = false
            document.getElementById("flux_button").style.cursor = "pointer"
        } else {
            document.getElementById("flux_button").innerHTML =
                "需" + format_lvl(game.flux_level) + "级"
            if (!meme) {
                if (game.flux_level < 60) {
                    document.getElementById("flux_button").style.color =
                        get_color(Math.floor(game.flux_level / 10))
                } else if (game.flux_level < 12000) {
                    document.getElementById("flux_button").style.color =
                        get_color((Math.floor(game.flux_level / 60) + 5) % 12)
                } else if (game.flux_level < 60000) {
                    document.getElementById("flux_button").style.color =
                        get_color((Math.floor(game.flux_level / 300) - 3) % 12)
                } else {
                    document.getElementById("flux_button").style.color =
                        get_color((Math.floor(game.flux_level / 1200) + 3) % 12)
                }
            }
            document.getElementById("flux_button").style.cursor = "default"
            if (meme) document.getElementById("flux_button").disabled = true
        }
    } else {
        document.getElementById("flux_button").innerHTML = "MAXED"
        if (!meme)
            document.getElementById("flux_button").style.color = "#ffffff"
        else document.getElementById("flux_button").disabled = true
        document.getElementById("flux_button").style.cursor = "default"
    }
    document.getElementById("flux").innerHTML =
        "EXP Flux<br>阶层" +
        format_num(game.flux_tier + game.starter_kit + game.generator_kit) +
        "：点击经验值变为" +
        format_eff(game.exp_flux) +
        "倍(每分钟+" +
        format_eff(
            (game.flux_tier + game.starter_kit + game.generator_kit) *
                0.15 *
                game.flux_boost *
                game.flux_increase
        ) +
        ")"
    if (
        (game.flux_tier + game.starter_kit + game.generator_kit) *
            0.15 *
            game.flux_boost *
            game.flux_increase >
        60
    )
        document.getElementById("flux").innerHTML =
            "EXP Flux<br>阶层" +
            format_num(game.flux_tier + game.starter_kit + game.generator_kit) +
            "：点击经验值变为" +
            format_eff(game.exp_flux) +
            "倍(每秒+" +
            format_eff(
                (game.flux_tier + game.starter_kit + game.generator_kit) *
                    0.0025 *
                    game.flux_boost *
                    game.flux_increase
            ) +
            ")"

    //exp battery
    if (game.pp_bought[25] && game.challenge !== 7) {
        document.getElementById("battery").style.display = "block"
        document.getElementById("battery_button").style.display = "inline"
        if (!game.perks[8])
            document.getElementById("battery_mode").style.display = "inline"
        if (game.pp_bought[2])
            document.getElementById("battery_auto").style.display = "inline"
    }
    if (game.battery_level < game.pr_min || game.pp_bought[6]) {
        if (game.level >= game.battery_level) {
            document.getElementById("battery_button").innerHTML = "UPGRADE!"
            if (!meme)
                document.getElementById("battery_button").style.color =
                    "#ffffff"
            else document.getElementById("battery_button").disabled = false
            document.getElementById("battery_button").style.cursor = "pointer"
        } else {
            document.getElementById("battery_button").innerHTML =
                "需" + format_lvl(game.battery_level) + "级"
            if (!meme) {
                if (game.battery_level < 60) {
                    document.getElementById("battery_button").style.color =
                        get_color(Math.floor(game.battery_level / 10))
                } else if (game.battery_level < 12000) {
                    document.getElementById("battery_button").style.color =
                        get_color(
                            (Math.floor(game.battery_level / 60) + 5) % 12
                        )
                } else if (game.battery_level < 60000) {
                    document.getElementById("battery_button").style.color =
                        get_color(
                            (Math.floor(game.battery_level / 300) - 3) % 12
                        )
                } else {
                    document.getElementById("battery_button").style.color =
                        get_color(
                            (Math.floor(game.battery_level / 1200) + 3) % 12
                        )
                }
            }
            document.getElementById("battery_button").style.cursor = "default"
            if (meme) document.getElementById("battery_button").disabled = true
        }
    } else {
        document.getElementById("battery_button").innerHTML = "MAXED"
        if (!meme)
            document.getElementById("battery_button").style.color = "#ffffff"
        document.getElementById("battery_button").style.cursor = "default"
        if (meme) document.getElementById("battery_button").disabled = true
    }
    document.getElementById("battery").innerHTML =
        "EXP Battery<br>阶层" +
        format_num(game.battery_tier + game.starter_kit + game.generator_kit) +
        "：自动经验值产量变为" +
        format_eff(game.exp_battery ** game.battery_charge) +
        "倍(" +
        format_eff(game.battery_charge * 100) +
        "%电容)"
    if (game.perks[8])
        document.getElementById("battery").innerHTML =
            "EXP Battery<br>阶层" +
            format_num(
                game.battery_tier + game.starter_kit + game.generator_kit
            ) +
            "：自动点击的速度变为" +
            format_eff(game.exp_battery ** game.battery_charge) +
            "倍"

    if (game.starter_kit + game.generator_kit > 0) {
        document.getElementById("starter_kit").style.display = "block"
        document.getElementById("starter_kit").innerHTML =
            "由于初始套件的效果，免费增加了" +
            format_num(game.starter_kit + game.generator_kit) +
            "阶层"
    } else {
        document.getElementById("starter_kit").style.display = "none"
    }
}

//updating statistics page
function stats_update() {
    if (game.tab === 5 && game.subtab[3] === 0) {
        let auto_plus = ""
        if (
            game.fluct_tier === 0 &&
            game.starter_kit + game.generator_kit === 0
        ) {
            auto_plus =
                format_infinity(
                    game.global_multiplier
                        .mul(game.exp_add)
                        .mul(game.cap_boost)
                        .round()
                ) + "经验值"
            if (
                (game.autods_toggle && game.autods_goal === 0) ||
                (game.autods_goal === -1 &&
                    game.cap_mode === 4 &&
                    (!game.smartds_oc ||
                        (game.smartds_oc && game.oc_state === 2)))
            )
                auto_plus =
                    format_infinity(
                        game.global_multiplier
                            .mul(game.exp_add)
                            .mul(
                                game.cap_boost +
                                    (1 - game.cap_boost) * game.ds_boost
                            )
                            .round()
                    ) + "经验值(放电)"
        } else if (
            game.fluct_tier >= 1 ||
            game.starter_kit + game.generator_kit >= 1
        ) {
            auto_plus =
                format_range_infinity(
                    game.global_multiplier
                        .mul(game.exp_add)
                        .mul(game.cap_boost)
                        .round(),
                    game.global_multiplier
                        .mul(game.exp_add + game.exp_fluct)
                        .mul(game.cap_boost)
                        .round()
                ) + "经验值"
            if (game.range_mode === 1)
                auto_plus =
                    format_range_infinity(
                        game.global_multiplier
                            .mul(game.exp_add)
                            .mul(game.cap_boost)
                            .round(),
                        game.global_multiplier
                            .mul(game.exp_add + game.exp_fluct)
                            .mul(game.cap_boost)
                            .round()
                    ) + "经验值(平均)"
            if (
                (game.autods_toggle && game.autods_goal === 0) ||
                (game.autods_goal === -1 &&
                    game.cap_mode === 4 &&
                    (!game.smartds_oc ||
                        (game.smartds_oc && game.oc_state === 2)))
            )
                auto_plus =
                    format_infinity(
                        game.global_multiplier
                            .mul(game.exp_add + game.exp_fluct / 2)
                            .mul(
                                game.cap_boost +
                                    (1 - game.cap_boost) * game.ds_boost
                            )
                            .round()
                    ) + "经验值(放电)"
        }
        if (game.challenge === 7)
            auto_plus =
                format_infinity(
                    game.global_multiplier.mul(game.exp_add).round()
                ) + "经验值"

        let exp_eff = ""
        let level_rate = new Decimal(10 ** 20 / game.tickspeed)
        if (
            game.cps >= 10 ||
            game.prestige >= 1 ||
            game.reboot >= 1 ||
            game.quantum >= 1
        ) {
            exp_eff =
                "每秒" + format_eff_infinity(
                    game.global_multiplier
                        .mul(game.exp_add + game.exp_fluct / 2)
                        .mul(game.cap_boost)
                        .mul(
                            game.cps *
                                game.au_boost *
                                game.exp_battery ** game.battery_charge
                        )
                ) + "经验值"
            level_rate = game.goal.div(
                game.global_multiplier
                    .mul(game.exp_add + game.exp_fluct / 2)
                    .mul(game.cap_boost)
                    .mul(
                        game.cps *
                            game.au_boost *
                            game.exp_battery ** game.battery_charge
                    )
            )
            if (
                (game.autods_toggle && game.autods_goal === 0) ||
                (game.autods_goal === -1 &&
                    game.cap_mode === 4 &&
                    (!game.smartds_oc ||
                        (game.smartds_oc && game.oc_state === 2)))
            ) {
                exp_eff =
                    "每秒" + format_eff_infinity(
                        game.global_multiplier
                            .mul(game.exp_add + game.exp_fluct / 2)
                            .mul(
                                game.cap_boost +
                                    (1 - game.cap_boost) * game.ds_boost
                            )
                            .mul(
                                game.cps *
                                    game.au_boost *
                                    game.exp_battery ** game.battery_charge
                            )
                    ) + "经验值(放电)"
                level_rate = game.goal.div(
                    game.global_multiplier
                        .mul(game.exp_add + game.exp_fluct / 2)
                        .mul(
                            game.cap_boost +
                                (1 - game.cap_boost) * game.ds_boost
                        )
                        .mul(
                            game.cps *
                                game.au_boost *
                                game.exp_battery ** game.battery_charge
                        )
                )
            }
        }
        if (game.challenge === 7) {
            exp_eff =
                "每秒" + format_eff_infinity(
                    game.global_multiplier.mul(game.exp_add).mul(game.cps)
                ) + "经验值"
            level_rate = game.goal.div(
                game.global_multiplier.mul(game.exp_add).mul(game.cps)
            )
        }

        let total_auto = ""
        if (game.amp > 1) {
            total_auto =
                format_eff_infinity(
                    game.global_multiplier.mul(game.amp).mul(game.cap_boost)
                ) + "倍"
            if (
                (game.autods_toggle && game.autods_goal === 0) ||
                (game.autods_goal === -1 &&
                    game.cap_mode === 4 &&
                    (!game.smartds_oc ||
                        (game.smartds_oc && game.oc_state === 2)))
            )
                total_auto =
                    format_eff_infinity(
                        game.global_multiplier
                            .mul(game.amp)
                            .mul(
                                game.cap_boost +
                                    (1 - game.cap_boost) * game.ds_boost
                            )
                    ) + "倍(放电)"
            total_manual =
                format_eff_infinity(game.global_multiplier.mul(game.amp)) + "倍"

            if (game.challenge === 7)
                total_auto =
                    format_eff_infinity(game.global_multiplier.mul(game.amp)) +
                    "倍"
        }

        document.getElementById("current_level_stat").innerHTML =
            format_lvl(game.level) + "级"
        document.getElementById("highest_level_stat").innerHTML =
            format_lvl(game.highest_level) + "级"
        document.getElementById("highest_level_ci_stat").innerHTML =
            format_lvl(game.reboot_highest_level) + "级"
        document.getElementById("highest_level_at_stat").innerHTML =
            "" + format_lvl(game.all_time_highest_level) + "级"
        if (game.level < 60 || game.pp_bought[6])
            document.getElementById("current_exp_stat").innerHTML =
                format_infinity(game.exp) +
                "经验值，升级需" +
                format_infinity(game.goal) +
                "经验值"
        else document.getElementById("current_exp_stat").innerHTML = "Maxed!"
        document.getElementById("total_exp_cp_stat").innerHTML =
            format_infinity(game.total_exp) + "经验值"
        document.getElementById("total_exp_cr_stat").innerHTML =
            format_infinity(game.prestige_exp) + "经验值"
        document.getElementById("total_exp_ci_stat").innerHTML =
            format_infinity(game.reboot_exp) + "经验值"
        document.getElementById("total_exp_at_stat").innerHTML =
            format_infinity(game.all_time_exp) + "经验值"
        document.getElementById("exp_click_au_stat").innerHTML =
            "<br>" + auto_plus
        document.getElementById("exp_multi_au_stat").innerHTML = total_auto
        document.getElementById("autoclicking_stat").innerHTML =
            "每秒点击" + format_num(game.cps * game.au_boost) + "次"
        if (game.pp_bought[24] || game.pp_bought[25])
            document.getElementById("autoclicking_stat").innerHTML =
                "每秒点击" + format_eff(
                    game.cps *
                        game.au_boost *
                        game.exp_battery ** game.battery_charge
                ) + "次"
        document.getElementById("auto_power_stat").innerHTML = exp_eff
        if (level_rate.cmp(10 ** 20 / game.tickspeed) >= 0) {
            document.getElementById("level_rate_stat").innerHTML =
                "每秒" + format_num(0) + "级"
        } else {
            document.getElementById("level_rate_stat").innerHTML =
                "每" + format_time(level_rate.toNumber() * game.tickspeed) +
                format_num(1) +
                "级"
            if (level_rate < 1)
                document.getElementById("level_rate_stat").innerHTML =
                    "每秒" + format_eff_infinity(Decimal.div(1, level_rate)) +
                    "级"
        }
        document.getElementById("total_clicks_cp_stat").innerHTML =
            "<br>" + format_num(game.clicks) + "次"
        document.getElementById("total_clicks_cr_stat").innerHTML = format_num(
            game.prestige_clicks
        ) + "次"
        document.getElementById("total_clicks_ci_stat").innerHTML = format_num(
            game.reboot_clicks
        ) + "次"
        document.getElementById("total_clicks_at_stat").innerHTML = format_num(
            game.total_clicks
        ) + "次"
        document.getElementById("times_prestiged_stat").innerHTML =
            "<br>" + format_num(game.prestige) + "次"
        if (game.perks[18] && game.banked_prestige > 0)
            document.getElementById("times_prestiged_stat").innerHTML =
                "<br>" +
                format_num(game.prestige) +
                "次(+" +
                format_num(game.banked_prestige) +
                "次)"
        document.getElementById("amplification_stat").innerHTML =
            format_num(game.amp) + "放大倍率"
        document.getElementById("current_pp_stat").innerHTML =
            format_num(game.pp) + "转生点"
        document.getElementById("total_pp_stat").innerHTML =
            format_num(game.total_pp) + "转生点"
        document.getElementById("total_reboots_stat").innerHTML =
            "<br>" + format_num(game.reboot) + "次"
        document.getElementById("generator_power_stat").innerHTML =
            format_num(game.watts) + "瓦特"
        if (game.watts === 1 && game.notation !== 8)
            document.getElementById("generator_power_stat").innerHTML =
                format_num(game.watts) + "瓦特"
        document.getElementById("current_hydrogen_stat").innerHTML =
            format_eff(game.hydrogen) + "克氢"
        document.getElementById("total_iterations_stat").innerHTML =
            "<br>" + format_num(game.quantum) + "次"
        document.getElementById("current_photons_stat").innerHTML =
            format_infinity(game.photons) + "光子"
        if (game.photons.cmp(1) === 0 && game.notation !== 8)
            document.getElementById("current_photons_stat").innerHTML =
                format_infinity(game.photons) + "光子"
        document.getElementById("time_played_cp_stat").innerHTML =
            "<br>" + format_time(game.time)
        document.getElementById("fastest_prestige_stat").innerHTML =
            format_time(game.fastest_prestige)
        document.getElementById("time_played_cr_stat").innerHTML = format_time(
            game.prestige_time
        )
        document.getElementById("fastest_reboot_stat").innerHTML = format_time(
            game.fastest_reboot
        )
        document.getElementById("time_played_ci_stat").innerHTML = format_time(
            game.reboot_time
        )
        document.getElementById("fastest_quantize_stat").innerHTML =
            format_time(game.fastest_quantize)
        document.getElementById("time_played_at_stat").innerHTML = format_time(
            game.all_time
        )
        if (game.prestige <= 0 && game.reboot <= 0 && game.quantum <= 0) {
            document.getElementById("total_exp_cp_name").innerHTML =
                "Total EXP:"
            document.getElementById("total_clicks_cp_name").innerHTML =
                "<br>Total Clicks:"
            document.getElementById("time_played_cp_name").innerHTML =
                "<br>Time Played:"
            document.getElementById("total_exp_cr").style.display = "none"
            document.getElementById("exp_multi_au").style.display = "none"
            document.getElementById("total_clicks_cr").style.display = "none"
            document.getElementById("times_prestiged").style.display = "none"
            document.getElementById("amplification").style.display = "none"
            document.getElementById("current_pp").style.display = "none"
            document.getElementById("total_pp").style.display = "none"
            document.getElementById("fastest_prestige").style.display = "none"
            document.getElementById("time_played_cr").style.display = "none"
        } else {
            document.getElementById("total_exp_cp_name").innerHTML =
                "Total EXP (Current Prestige):"
            document.getElementById("total_clicks_cp_name").innerHTML =
                "<br>Total Clicks (Current Prestige):"
            document.getElementById("time_played_cp_name").innerHTML =
                "<br>Time Played (Current Prestige):"
            document.getElementById("total_exp_cr").style.display = "flex"
            document.getElementById("exp_multi_au").style.display = "flex"
            document.getElementById("total_clicks_cr").style.display = "flex"
            document.getElementById("times_prestiged").style.display = "flex"
            document.getElementById("amplification").style.display = "flex"
            document.getElementById("current_pp").style.display = "flex"
            document.getElementById("total_pp").style.display = "flex"
            document.getElementById("fastest_prestige").style.display = "flex"
            document.getElementById("time_played_cr").style.display = "flex"
        }

        if (game.reboot <= 0 && game.quantum <= 0) {
            document.getElementById("highest_level_ci").style.display = "none"
            document.getElementById("total_exp_ci").style.display = "none"
            document.getElementById("total_clicks_ci").style.display = "none"
            document.getElementById("total_reboots").style.display = "none"
            document.getElementById("generator_power").style.display = "none"
            document.getElementById("time_played_ci").style.display = "none"
            document.getElementById("fastest_reboot").style.display = "none"

            document.getElementById("highest_level_name").innerHTML =
                "Highest Level:"
            document.getElementById("total_exp_cr_name").innerHTML =
                "Total EXP (All Time):"
            document.getElementById("total_clicks_cr_name").innerHTML =
                "Total Clicks (All Time):"
            document.getElementById("time_played_cr_name").innerHTML =
                "Time Played (All Time):"
        } else {
            document.getElementById("highest_level_ci").style.display = "flex"
            document.getElementById("total_exp_ci").style.display = "flex"
            document.getElementById("total_clicks_ci").style.display = "flex"
            document.getElementById("total_reboots").style.display = "flex"
            document.getElementById("generator_power").style.display = "flex"
            document.getElementById("time_played_ci").style.display = "flex"
            document.getElementById("fastest_reboot").style.display = "flex"

            document.getElementById("highest_level_name").innerHTML =
                "Highest Level (Current Reboot):"
            document.getElementById("total_exp_cr_name").innerHTML =
                "Total EXP (Current Reboot):"
            document.getElementById("total_clicks_cr_name").innerHTML =
                "Total Clicks (Current Reboot):"
            document.getElementById("time_played_cr_name").innerHTML =
                "Time Played (Current Reboot):"
        }

        if (game.quantum <= 0) {
            document.getElementById("highest_level_at").style.display = "none"
            document.getElementById("total_exp_at").style.display = "none"
            document.getElementById("total_clicks_at").style.display = "none"
            document.getElementById("total_iterations").style.display = "none"
            document.getElementById("current_photons").style.display = "none"
            document.getElementById("time_played_at").style.display = "none"
            document.getElementById("fastest_quantize").style.display = "none"

            document.getElementById("highest_level_ci_name").innerHTML =
                "Highest Level (All Time):"
            document.getElementById("total_exp_ci_name").innerHTML =
                "Total EXP (All Time):"
            document.getElementById("total_clicks_ci_name").innerHTML =
                "Total Clicks (All Time):"
            document.getElementById("time_played_ci_name").innerHTML =
                "Time Played (All Time):"
        } else {
            document.getElementById("highest_level_at").style.display = "flex"
            document.getElementById("total_exp_at").style.display = "flex"
            document.getElementById("total_clicks_at").style.display = "flex"
            document.getElementById("total_iterations").style.display = "flex"
            document.getElementById("current_photons").style.display = "flex"
            document.getElementById("time_played_at").style.display = "flex"
            document.getElementById("fastest_quantize").style.display = "flex"

            document.getElementById("highest_level_ci_name").innerHTML =
                "Highest Level (Current Iteration):"
            document.getElementById("total_exp_ci_name").innerHTML =
                "Total EXP (Current Iteration):"
            document.getElementById("total_clicks_ci_name").innerHTML =
                "Total Clicks (Current Iteration):"
            document.getElementById("time_played_ci_name").innerHTML =
                "Time Played (Current Iteration):"
        }

        if (game.perks[23]) {
            document.getElementById("current_hydrogen").style.display = "flex"
        } else {
            document.getElementById("current_hydrogen").style.display = "none"
        }

        if (game.pp_bought[6] || game.reboot >= 1 || game.quantum >= 1) {
            document.getElementById("level_rate").style.display = "flex"
        } else {
            document.getElementById("level_rate").style.display = "none"
        }
        if (
            game.cps >= 10 ||
            game.prestige >= 1 ||
            game.reboot >= 1 ||
            game.quantum >= 1
        ) {
            document.getElementById("auto_power").style.display = "flex"
        } else {
            document.getElementById("auto_power").style.display = "none"
        }
        if (
            game.cps > 0 ||
            game.prestige >= 1 ||
            game.reboot >= 1 ||
            game.quantum >= 1
        ) {
            document.getElementById("autoclicking").style.display = "flex"
        } else {
            document.getElementById("autoclicking").style.display = "none"
        }
    }

    if (
        (game.prestige >= 1 || game.reboot >= 1 || game.quantum >= 1) &&
        game.tab === 5
    ) {
        document.getElementById("statistics_tabs").style.display = "flex"
    } else {
        document.getElementById("statistics_tabs").style.display = "none"
    }

    if (game.tab === 5 && game.subtab[3] === 1) {
        let reset_str = "Past Prestiges:"

        let amp_sec = 0
        let entries = 0
        for (let i = 0; i < 5; i++) {
            reset_str += "<br>[" + format_num(i + 1) + "]"

            if (!game.past_alt[0]) {
                if (game.amp_amount[i] === -1) {
                    reset_str += "无数据"
                } else {
                    reset_str +=
                        "放大倍率+" +
                        format_num(Math.round(game.amp_amount[i])) +
                        "，耗时" +
                        format_time(game.amp_time[i] * game.tickspeed) +
                        "(每秒放大倍率+" +
                        format_eff(game.amp_eff[i]) +
                        ")"
                    entries++
                    amp_sec += game.amp_eff[i]
                }
            } else {
                if (game.pp_amount[i] === -1) {
                    reset_str += "无数据"
                } else {
                    reset_str +=
                        "转生点+" +
                        format_num(Math.round(game.pp_amount[i])) +
                        "，耗时" +
                        format_time(game.amp_time[i] * game.tickspeed)
                }
            }
        }

        if (!game.past_alt[0]) {
            if (entries !== 0) {
                amp_sec /= entries
                reset_str +=
                    "<br><br>放大倍率平均收益：每秒放大倍率+" +
                    format_eff(amp_sec) +
                    ""
            } else {
                reset_str += "<br><br>放大倍率平均收益：未知"
            }
        }

        document.getElementById("past_prestiges_text").innerHTML = reset_str

        if (game.perks[28]) {
            document.getElementById("past_prestiges_mode").style.display =
                "none"
            if (game.past_alt[0]) past_resets_mode(1)
        } else {
            document.getElementById("past_prestiges_mode").style.display =
                "block"
        }

        if (game.reboot >= 1 || game.quantum >= 1) {
            document.getElementById("past_reboots").style.display = "block"
            reset_str = "Past Reboots:"

            let watts_sec = 0
            let hydrogen_sec = 0
            entries = 0
            for (let i = 0; i < 5; i++) {
                reset_str += "<br>[" + format_num(i + 1) + "]"

                if (!game.past_alt[1]) {
                    if (game.watts_amount[i] === -1) {
                        reset_str += "无数据"
                    } else {
                        reset_str +=
                            "瓦特+" +
                            format_num(game.watts_amount[i]) +
                            "，耗时" +
                            format_time(game.watts_time[i] * game.tickspeed)
                        if (game.watts_eff[i] < 1 / 60) {
                            reset_str +=
                                "(每小时瓦特+" +
                                format_eff(game.watts_eff[i] * 3600) +
                                ")"
                        } else if (game.watts_eff[i] < 1) {
                            reset_str +=
                                "(每分钟瓦特+" +
                                format_eff(game.watts_eff[i] * 60) +
                                ")"
                        } else {
                            reset_str +=
                                "(每秒瓦特+" +
                                format_eff(game.watts_eff[i]) +
                                ")"
                        }
                        entries++
                        watts_sec += game.watts_eff[i]
                    }
                } else {
                    if (game.hydrogen_amount[i] === -1) {
                        reset_str += "无数据"
                    } else {
                        reset_str +=
                            "氢+" +
                            format_eff(game.hydrogen_amount[i]) +
                            "克，耗时" +
                            format_time(game.watts_time[i] * game.tickspeed)
                        if (game.hydrogen_eff[i] < 1 / 60) {
                            reset_str +=
                                "(每小时氢+" +
                                format_eff(game.hydrogen_eff[i] * 3600) +
                                "克)"
                        } else if (game.hydrogen_eff[i] < 1) {
                            reset_str +=
                                "(每分钟氢+" +
                                format_eff(game.hydrogen_eff[i] * 60) +
                                "克)"
                        } else {
                            reset_str +=
                                "(每秒氢+" +
                                format_eff(game.hydrogen_eff[i]) +
                                "克)"
                        }
                        entries++
                        hydrogen_sec += game.hydrogen_eff[i]
                    }
                }
            }

            if (!game.past_alt[1]) {
                if (entries !== 0) {
                    watts_sec /= entries
                    if (watts_sec < 1 / 60) {
                        reset_str +=
                            "<br><br>瓦特平均收益：每小时瓦特+" +
                            format_eff(watts_sec * 3600) +
                            ""
                    } else if (watts_sec < 1) {
                        reset_str +=
                            "<br><br>瓦特平均收益：每分钟瓦特+" +
                            format_eff(watts_sec * 60) +
                            ""
                    } else {
                        reset_str +=
                            "<br><br>瓦特平均收益：每秒瓦特+" +
                            format_eff(watts_sec) +
                            ""
                    }
                } else {
                    reset_str += "<br><br>瓦特平均收益：未知"
                }
            } else {
                if (entries !== 0) {
                    hydrogen_sec /= entries
                    if (hydrogen_sec < 1 / 60) {
                        reset_str +=
                            "<br><br>氢平均收益：每小时氢+" +
                            format_eff(hydrogen_sec * 3600) +
                            "克"
                    } else if (hydrogen_sec < 1) {
                        reset_str +=
                            "<br><br>氢平均收益：每分钟氢+" +
                            format_eff(hydrogen_sec * 60) +
                            "克"
                    } else {
                        reset_str +=
                            "<br><br>氢平均收益：每秒氢+" +
                            format_eff(hydrogen_sec) +
                            "克"
                    }
                } else {
                    reset_str += "<br><br>氢平均收益：未知"
                }
            }

            document.getElementById("past_reboots_text").innerHTML = reset_str

            if (game.perks[23]) {
                document.getElementById("past_reboots_mode").style.display =
                    "block"
            } else {
                document.getElementById("past_reboots_mode").style.display =
                    "none"
            }
        } else {
            document.getElementById("past_reboots").style.display = "none"
        }

        if (game.quantum >= 1) {
            document.getElementById("past_quantum_text").style.display = "block"
            reset_str = "Past Quantum Iterations:"

            let photons_sec = new Decimal(0)
            entries = 0
            for (let i = 0; i < 5; i++) {
                reset_str += "<br>[" + format_num(i + 1) + "]"
                if (game.photons_amount[i] === -1) {
                    reset_str += "无数据"
                } else {
                    reset_str +=
                        "光子+" +
                        format_infinity(game.photons_amount[i]) +
                        "，耗时" +
                        format_time(game.photons_time[i] * game.tickspeed)
                    if (game.photons_eff[i].cmp(1 / 60) === -1) {
                        reset_str +=
                            "(每小时光子+" +
                            format_eff_infinity(game.photons_eff[i].mul(3600)) +
                            ")"
                    } else {
                        reset_str +=
                            "(每分钟光子+" +
                            format_eff_infinity(game.photons_eff[i].mul(60)) +
                            ")"
                    }
                    entries++
                    photons_sec = photons_sec.add(game.photons_eff[i])
                }
            }

            if (entries !== 0) {
                photons_sec = photons_sec.div(entries)
                if (photons_sec.cmp(1 / 60) === -1) {
                    reset_str +=
                        "<br><br>光子平均收益：每小时光子+" +
                        format_eff_infinity(photons_sec.mul(3600)) +
                        ""
                } else {
                    reset_str +=
                        "<br><br>光子平均收益：每分钟光子+" +
                        format_eff_infinity(photons_sec.mul(60)) +
                        ""
                }
            } else {
                reset_str += "<br><br>光子平均收益：未知"
            }

            document.getElementById("past_quantum_text").innerHTML = reset_str
        } else {
            document.getElementById("past_quantum_text").style.display = "none"
        }
    }
}

//updating availability of pp upgrades
function pp_update() {
    //prestige panel
    document.getElementById("amp2").innerHTML = format_num(game.amp)
    document.getElementById("amp_boost").innerHTML =
        "使经验值产量变为" + format_num(game.amp) + "倍"
    document.getElementById("pp2").innerHTML = format_num(game.pp)

    if (game.challenge !== 4) {
        if (game.level >= game.pr_min) {
            document.getElementById("amp_up2").innerHTML =
                "+" +
                format_num(
                    Math.floor(
                        get_amp(game.level) * game.patience * game.watt_boost
                    )
                ) +
                "放大倍率"
            if (game.challenge === 9)
                document.getElementById("amp_up2").innerHTML =
                    "+" + format_num(0) + "放大倍率"
            let pp_amount = 0
            if (game.level > game.highest_level) {
                if (game.prestige <= 21)
                    pp_amount =
                        get_pp(game.level) - get_pp(game.highest_level) + 1
                else pp_amount = get_pp(game.level) - get_pp(game.highest_level)
            } else {
                if (game.prestige <= 21) pp_amount = 1
                else pp_amount = 0
            }
            document.getElementById("pp_up2").innerHTML =
                "+" + format_num(pp_amount) + "转生点"
            document.getElementById("prestige_button").innerHTML = "PRESTIGE!"
            if (!meme)
                document.getElementById("prestige_button").style.color = "white"
            else document.getElementById("prestige_button").disabled = false
            document.getElementById("prestige_button").style.cursor = "pointer"
        } else {
            document.getElementById("amp_up2").innerHTML =
                "+" + format_num(0) + "放大倍率"
            document.getElementById("pp_up2").innerHTML =
                "+" + format_num(0) + "转生点"
            document.getElementById("prestige_button").innerHTML =
                "需" + format_lvl(game.pr_min) + "级"
            if (!meme)
                document.getElementById("prestige_button").style.color =
                    get_color((Math.floor(game.pr_min / 60) + 5) % 12)
            else document.getElementById("prestige_button").disabled = true
            document.getElementById("prestige_button").style.cursor = "default"
        }
    } else {
        if (game.level >= game.highest_level) {
            let amp_amount = get_amp(game.level) - get_amp(game.highest_level)
            document.getElementById("amp_up2").innerHTML =
                "+" +
                format_num(Math.floor(amp_amount * game.watt_boost)) +
                "放大倍率"
            let pp_amount = 0
            if (game.prestige <= 21)
                pp_amount = get_pp(game.level) - get_pp(game.highest_level) + 1
            else pp_amount = get_pp(game.level) - get_pp(game.highest_level)
            document.getElementById("pp_up2").innerHTML =
                "+" + format_num(pp_amount) + "转生点"
            document.getElementById("prestige_button").innerHTML = "PRESTIGE!"
            if (!meme)
                document.getElementById("prestige_button").style.color = "white"
            else document.getElementById("prestige_button").disabled = false
            document.getElementById("prestige_button").style.cursor = "pointer"
        } else {
            document.getElementById("amp_up2").innerHTML =
                "+" + format_num(0) + "放大倍率"
            document.getElementById("pp_up2").innerHTML =
                "+" + format_num(0) + "转生点"
            document.getElementById("prestige_button").innerHTML =
                "需" + format_lvl(game.highest_level) + "级"
            if (meme) document.getElementById("prestige_button").disabled = true
            document.getElementById("prestige_button").style.cursor = "default"

            if (!meme) {
                if (game.highest_level < 12000) {
                    document.getElementById("prestige_button").style.color =
                        get_color(
                            (Math.floor(game.highest_level / 60) + 5) % 12
                        )
                } else if (game.highest_level < 60000) {
                    document.getElementById("prestige_button").style.color =
                        get_color(
                            (Math.floor(game.highest_level / 300) - 3) % 12
                        )
                } else {
                    document.getElementById("prestige_button").style.color =
                        get_color(
                            (Math.floor(game.highest_level / 1200) + 3) % 12
                        )
                }
            }
        }
    }

    if (!game.perks[28] || game.challenge === 6) {
        document.getElementById("amp_up2").style.marginTop = "0em"
        document.getElementById("pp_up2").style.display = "inline"

        if (game.pp_bought[6]) {
            if (game.highest_level < 500) {
                document.getElementById("pp_next").style.display = "inline"
                if (game.level < game.highest_level) {
                    let current_pp = ((game.highest_level - 40) / 20) ** 2 - 1
                    if (current_pp % 1 === 0) {
                        current_pp++
                    } else {
                        current_pp = Math.ceil(current_pp)
                    }
                    document.getElementById("pp_next").innerHTML =
                        "(下次获得转生点需达到" +
                        format_lvl(
                            Math.ceil((current_pp + 1) ** 0.5 * 20 + 40)
                        ) +
                        "级)"
                } else {
                    let current_pp = ((game.level - 40) / 20) ** 2 - 1
                    if (current_pp % 1 === 0) {
                        current_pp++
                    } else {
                        current_pp = Math.ceil(current_pp)
                    }
                    document.getElementById("pp_next").innerHTML =
                        "(下次获得转生点需达到" +
                        format_lvl(
                            Math.ceil((current_pp + 1) ** 0.5 * 20 + 40)
                        ) +
                        "级)"
                }
            } else {
                if (game.level < game.highest_level) {
                    document.getElementById("pp_next").style.display = "inline"
                    document.getElementById("pp_next").innerHTML =
                        "(下次获得转生点需达到" +
                        format_lvl(game.highest_level + 1) +
                        "级)"
                } else {
                    document.getElementById("pp_next").style.display = "none"
                }
            }
        } else {
            document.getElementById("pp_next").style.display = "none"
        }
    } else {
        document.getElementById("amp_up2").style.marginTop = "0.5em"
        document.getElementById("pp_up2").style.display = "none"
        document.getElementById("pp_next").style.display = "none"
    }

    //pp upgrade handling
    for (const upgrade of pp_upgrade.upgrades) {
        let element = pp_map.get(upgrade)
        let button = element.querySelector(".pp_button")

        if (upgrade.name === "The Generator") {
            let all_pp_upgrades = true
            for (const upgrade2 of pp_upgrade.upgrades) {
                if (
                    upgrade2.id < 39 &&
                    upgrade2.id !== 8 &&
                    !game.pp_bought[upgrade2.id]
                )
                    all_pp_upgrades = false
            }
            if (all_pp_upgrades) {
                element.style.display = "flex"
            } else {
                element.style.display = "none"
            }
        } else {
            if (upgrade.can_buy()) {
                element.style.display = "flex"
            } else {
                element.style.display = "none"
                if (
                    (game.reboot >= 1 || game.quantum >= 1) &&
                    game.pp_hide === 0
                ) {
                    element.style.display = "flex"
                }
            }
        }

        if (game.pp_bought[upgrade.id]) {
            button.className = "pp_button pp_bought"
            button.innerHTML = "PURCHASED"

            if (meme) button.disabled = true

            if (game.pp_hide === 2) {
                element.style.display = "none"
            } else if (game.pp_hide === 1) {
                if (
                    upgrade.name === "EXP Flux" ||
                    upgrade.name === "Spare Power" ||
                    upgrade.name === "Fully Automatic V" ||
                    upgrade.name === "Prestige Power" ||
                    upgrade.name === "Depth Power"
                ) {
                    element.style.display = "flex"
                } else {
                    element.style.display = "none"
                }
            } else if (game.pp_hide === 0) {
                element.style.display = "flex"
            }
        } else {
            button.innerHTML = "-" + format_num(upgrade.price) + "转生点"
            if (game.pp >= upgrade.price) {
                button.className = "pp_button pp_hidden"
                if (meme) button.disabled = true
                if (upgrade.can_buy()) {
                    button.className = "pp_button pp_unlocked"
                    if (meme) button.disabled = false
                }
            } else {
                button.className = "pp_button pp_hidden"
                if (upgrade.can_buy()) button.className = "pp_button pp_locked"
                if (meme) button.disabled = true
            }
        }

        if (upgrade.name === "AMP Efficiency") {
            element.style.display = "none"
        }

        if (game.perks[7] && upgrade.id !== 39) {
            let text = element.querySelector(".pp_text")
            let priority = text.querySelector(".pp_priority")
            priority.style.display = "block"
        }
    }

    //spare power
    if (game.pp_bought[22] && game.challenge !== 7) {
        if (game.pp !== 0) {
            game.pp_power = Math.log(game.pp / 100 + 1) ** 2 + 1
        } else {
            game.pp_power = 1
        }
    }

    //hiding lvl / 60 display
    if (game.pp_bought[6]) {
        document.getElementById("lvlrequirement").style.display = "none"
    } else {
        document.getElementById("lvlrequirement").style.display = "inline"
    }

    //show priority layer setting
    if (game.prestige >= 1 || game.reboot >= 1 || game.quantum >= 1) {
        document.getElementById("priority_layer").style.display = "flex"
    } else {
        document.getElementById("priority_layer").style.display = "none"
    }
}

//updating generator display
function watts_update() {
    document.getElementById("watts").innerHTML = format_num(game.watts)

    if (game.watts === 1 && game.notation !== 8)
        document.getElementById("watts_text").innerHTML = "瓦特"
    else document.getElementById("watts_text").innerHTML = "瓦特"

    if (game.watts <= 0 && game.notation !== 8)
        document.getElementById("watts").className = "watts_text no_power"
    else document.getElementById("watts").className = "watts_text power"

    document.getElementById("gen_boost").innerHTML =
        "使放大倍率获取速度变为" + format_num(game.watt_boost) + "倍"

    let all_pp_upgrades = true
    for (const upgrade2 of pp_upgrade.upgrades) {
        if (
            upgrade2.id < 39 &&
            upgrade2.id !== 8 &&
            !game.pp_bought[upgrade2.id]
        )
            all_pp_upgrades = false
    }

    if (!meme) {
        if (all_pp_upgrades)
            document.getElementById("all_pp_req").style.color = "#ffff00"
        else document.getElementById("all_pp_req").style.color = "#ffffff"
    } else {
        if (all_pp_upgrades)
            document.getElementById("all_pp_req").style.fontWeight = "bold"
        else document.getElementById("all_pp_req").style.fontWeight = "normal"
    }

    let reboot_requirement = 0
    if (game.reboot >= 1 || game.quantum >= 1) {
        reboot_requirement = 5000 * game.reboot + 80000
        if (game.reboot >= 24 || game.quantum >= 1) reboot_requirement = 200000
        if (game.qu_bought[2]) {
            if (game.challenge !== 0 && !entering) {
                if (game.prev_completions < 12) {
                    reboot_requirement =
                        challenge.challenges[game.challenge - 1].goal +
                        challenge.challenges[game.challenge - 1].step *
                            game.prev_completions +
                        (challenge.challenges[game.challenge - 1].step2 *
                            (game.prev_completions - 1) *
                            game.prev_completions) /
                            2
                } else {
                    if (game.dk_bought[3]) {
                        if (game.prev_completions < 20) {
                            reboot_requirement =
                                challenge.challenges[game.challenge - 1].goal2 +
                                challenge.challenges[game.challenge - 1].step3 *
                                    (game.prev_completions - 12) +
                                (challenge.challenges[game.challenge - 1]
                                    .step4 *
                                    (game.prev_completions - 13) *
                                    (game.prev_completions - 12)) /
                                    2
                        } else {
                            reboot_requirement =
                                challenge.challenges[game.challenge - 1].goal2 +
                                challenge.challenges[game.challenge - 1].step3 *
                                    7 +
                                challenge.challenges[game.challenge - 1].step4 *
                                    21
                        }
                    } else {
                        reboot_requirement =
                            challenge.challenges[game.challenge - 1].goal +
                            challenge.challenges[game.challenge - 1].step * 11 +
                            challenge.challenges[game.challenge - 1].step2 * 55
                    }
                }
            }
        } else {
            if (game.challenge !== 0 && !entering) {
                if (game.completions[game.challenge - 1] < 12) {
                    reboot_requirement =
                        challenge.challenges[game.challenge - 1].goal +
                        challenge.challenges[game.challenge - 1].step *
                            game.completions[game.challenge - 1] +
                        (challenge.challenges[game.challenge - 1].step2 *
                            (game.completions[game.challenge - 1] - 1) *
                            game.completions[game.challenge - 1]) /
                            2
                } else {
                    if (game.dk_bought[3]) {
                        if (game.completions[game.challenge - 1] < 20) {
                            reboot_requirement =
                                challenge.challenges[game.challenge - 1].goal2 +
                                challenge.challenges[game.challenge - 1].step3 *
                                    (game.completions[game.challenge - 1] -
                                        12) +
                                (challenge.challenges[game.challenge - 1]
                                    .step4 *
                                    (game.completions[game.challenge - 1] -
                                        13) *
                                    (game.completions[game.challenge - 1] -
                                        12)) /
                                    2
                        } else {
                            reboot_requirement =
                                challenge.challenges[game.challenge - 1].goal2 +
                                challenge.challenges[game.challenge - 1].step3 *
                                    7 +
                                challenge.challenges[game.challenge - 1].step4 *
                                    21
                        }
                    } else {
                        reboot_requirement =
                            challenge.challenges[game.challenge - 1].goal +
                            challenge.challenges[game.challenge - 1].step * 11 +
                            challenge.challenges[game.challenge - 1].step2 * 55
                    }
                }
            }
        }
        document.getElementById("spare_pp_req").style.display = "block"
        document.getElementById("reboot_button").innerHTML = "REBOOT!"
    } else {
        document.getElementById("spare_pp_req").style.display = "none"
        document.getElementById("reboot_button").innerHTML = "ACTIVATE!"
    }
    if (!meme) {
        if (game.pp >= reboot_requirement)
            document.getElementById("spare_pp_req").style.color = "#ffff00"
        else document.getElementById("spare_pp_req").style.color = "#ffffff"
    } else {
        if (game.pp >= reboot_requirement)
            document.getElementById("spare_pp_req").style.fontWeight = "bold"
        else document.getElementById("spare_pp_req").style.fontWeight = "normal"
    }
    if (!game.perks[13]) {
        document.getElementById("spare_pp_req").innerHTML =
            format_num(reboot_requirement) + "空余转生点"
    } else {
        if (get_watts(game.pp) < 527)
            document.getElementById("spare_pp_req").innerHTML =
                format_num(
                    Math.ceil(20000 * (get_watts(game.pp) + 1) + 180000)
                ) + "空余转生点"
        else
            document.getElementById("spare_pp_req").innerHTML =
                format_num(
                    Math.ceil(
                        20000 * (get_watts(game.pp) - 526) ** 1.25 + 10720000
                    )
                ) + "空余转生点"
    }

    if (game.challenge !== 0) {
        if (game.completions[game.challenge - 1] < 12) {
            document.getElementById("spare_pp_req").innerHTML =
                format_num(
                    challenge.challenges[game.challenge - 1].goal +
                        challenge.challenges[game.challenge - 1].step *
                            game.completions[game.challenge - 1] +
                        (challenge.challenges[game.challenge - 1].step2 *
                            (game.completions[game.challenge - 1] - 1) *
                            game.completions[game.challenge - 1]) /
                            2
                ) + "空余转生点"
        } else {
            if (game.dk_bought[3]) {
                if (game.completions[game.challenge - 1] < 20) {
                    document.getElementById("spare_pp_req").innerHTML =
                        format_num(
                            challenge.challenges[game.challenge - 1].goal2 +
                                challenge.challenges[game.challenge - 1].step3 *
                                    (game.completions[game.challenge - 1] -
                                        12) +
                                (challenge.challenges[game.challenge - 1]
                                    .step4 *
                                    (game.completions[game.challenge - 1] -
                                        13) *
                                    (game.completions[game.challenge - 1] -
                                        12)) /
                                    2
                        ) + "空余转生点"
                } else {
                    document.getElementById("spare_pp_req").innerHTML =
                        format_num(
                            challenge.challenges[game.challenge - 1].goal2 +
                                challenge.challenges[game.challenge - 1].step3 *
                                    7 +
                                challenge.challenges[game.challenge - 1].step4 *
                                    21
                        ) + "空余转生点"
                }
            } else {
                document.getElementById("spare_pp_req").innerHTML =
                    format_num(
                        challenge.challenges[game.challenge - 1].goal +
                            challenge.challenges[game.challenge - 1].step * 11 +
                            challenge.challenges[game.challenge - 1].step2 * 55
                    ) + "空余转生点"
            }
        }
    }

    if (all_pp_upgrades && game.pp >= reboot_requirement) {
        document.getElementById("reboot_button").className = "reboot_power"
        document.getElementById("watts_plus").style.display = "inline"
        if (meme) {
            document.getElementById("reboot_button").disabled = false
        }
        if (!game.perks[13]) {
            if (
                game.notation !== 8 &&
                game.prism_level === 0 &&
                game.om_boost[0] === 1
            )
                document.getElementById("watts_plus").innerHTML =
                    "+" +
                    format_num(game.prism_boost * game.om_boost[0]) +
                    "瓦特"
            else
                document.getElementById("watts_plus").innerHTML =
                    "+" +
                    format_num(game.prism_boost * game.om_boost[0]) +
                    "瓦特"
        } else {
            if (
                get_watts(game.pp) * game.prism_boost * game.om_boost[0] ===
                    1 &&
                game.notation !== 8
            )
                document.getElementById("watts_plus").innerHTML =
                    "+" +
                    format_num(
                        get_watts(game.pp) * game.prism_boost * game.om_boost[0]
                    ) +
                    "瓦特"
            else
                document.getElementById("watts_plus").innerHTML =
                    "+" +
                    format_num(
                        get_watts(game.pp) * game.prism_boost * game.om_boost[0]
                    ) +
                    "瓦特"
            if (game.perks[23] && (game.watts >= 98304 || game.dk_bought[5])) {
                document.getElementById("hydrogen_plus").style.display =
                    "inline"
                document.getElementById("hydrogen_plus").innerHTML =
                    "+" +
                    format_eff(
                        (get_watts(game.pp) / 100) *
                            2 ** game.supply_level *
                            game.prism_boost
                    ) +
                    "克氢"
                if (game.perks[26])
                    document.getElementById("hydrogen_plus").innerHTML =
                        "+" +
                        format_eff(
                            (get_watts(game.pp) / 100) *
                                2.5 ** game.supply_level *
                                game.prism_boost
                        ) +
                        "克氢"
                if (game.dk_bought[5])
                    document.getElementById("hydrogen_plus").innerHTML =
                        "+" +
                        format_eff(
                            (get_watts(game.pp) / 100) *
                                3 ** game.supply_level *
                                game.prism_boost
                        ) +
                        "克氢"
            }
        }
    } else {
        document.getElementById("reboot_button").className = "no_reboot_power"
        document.getElementById("watts_plus").style.display = "none"
        document.getElementById("hydrogen_plus").style.display = "none"
        if (meme) {
            document.getElementById("reboot_button").disabled = true
        }
    }

    //perks handling
    for (const perk of generator_perk.perks) {
        let element = perk_map.get(perk)
        let box = element.querySelector(".perk_complete")
        let text = element.querySelector(".perk_requirement")

        if (game.perks[perk.id]) {
            element.className = "generator_perk complete_perk"
            box.className = "perk_complete complete"
            text.className = "perk_requirement complete_text"
            text.innerHTML = "COMPLETED!"
            if (meme) box.disabled = true
        } else {
            element.className = "generator_perk incomplete_perk"
            box.className = "perk_complete incomplete"
            text.className = "perk_requirement incomplete_text"
            if (meme) box.disabled = false
            if (perk.requirement === 1 && game.notation !== 8)
                text.innerHTML =
                    "Requires<br>" + format_num(perk.requirement) + "瓦特"
            else
                text.innerHTML =
                    "Requires<br>" + format_num(perk.requirement) + "瓦特"
        }

        if (perk.id >= 3) {
            if (game.perks[perk.id - 3]) {
                if (game.perks[perk.id]) {
                    if (game.perks_hidden) element.style.display = "none"
                    else element.style.display = "flex"
                } else {
                    element.style.display = "flex"
                }
            } else {
                element.style.display = "none"
            }
        } else {
            if (game.perks[perk.id]) {
                if (game.perks_hidden) element.style.display = "none"
                else element.style.display = "flex"
            } else {
                element.style.display = "flex"
            }
        }
    }

    if (game.perks[7])
        document.getElementById("autopp_config").style.display = "block"
    else document.getElementById("autopp_config").style.display = "none"

    if (game.perks[8])
        document.getElementById("battery_mode").style.display = "none"

    if (game.perks[11])
        document.getElementById("cap_auto").style.display = "inline"
    else document.getElementById("cap_auto").style.display = "none"

    if (game.perks[15] && game.challenge === 0) {
        document.getElementById("autorb_block").style.display = "block"
        document.getElementById("watt_auto").style.display = "inline"

        if (game.perks[28] && game.challenge !== 6) {
            document.getElementById("pendingrb_enabled").style.display = "none"
        } else {
            document.getElementById("pendingrb_enabled").style.display = "block"
        }

        if (game.perks[22]) {
            document.getElementById("autorb_mode").style.display = "block"
        } else {
            document.getElementById("autorb_mode").style.display = "none"
        }

        if (game.dk_bought[0]) {
            document.getElementById("auto_push").style.display = "block"
        } else {
            document.getElementById("auto_push").style.display = "none"
        }
    } else {
        document.getElementById("autorb_block").style.display = "none"
        document.getElementById("watt_auto").style.display = "none"
    }

    if (game.perks[17] && game.tab === 3) {
        document.getElementById("reboot_tabs").style.display = "flex"
    } else {
        document.getElementById("reboot_tabs").style.display = "none"
    }

    if (game.reboot >= 1 || game.quantum >= 1) {
        document.getElementById("reboot_confirm").style.display = "flex"
    } else {
        document.getElementById("reboot_confirm").style.display = "none"
    }

    if (game.perks[17]) {
        document.getElementById("challenge_confirm").style.display = "flex"
    } else {
        document.getElementById("challenge_confirm").style.display = "none"
    }

    if (game.perks[23]) {
        document.getElementById("reactor_tab").style.display = "inline"
    } else {
        document.getElementById("reactor_tab").style.display = "none"
    }

    if (game.perks[28] && game.perks_hidden) {
        document.getElementById("gen_perks_text").style.display = "none"
    } else {
        document.getElementById("gen_perks_text").style.display = "block"
    }

    if (game.pp_bought[39]) {
        document.getElementById("menu").className = "menu short"
        document.getElementById("row2").className = "row short_row"
    } else {
        document.getElementById("menu").className = "menu"
        document.getElementById("row2").className = "row"
    }

    if (!game.achievements[104] && game.perks[28]) {
        get_achievement(104)
    }
}

//updating challenges page
function challenge_update() {
    let total_completions =
        game.completions[0] +
        game.completions[1] +
        game.completions[2] +
        game.completions[3] +
        game.completions[4] +
        game.completions[5] +
        game.completions[6] +
        game.completions[7] +
        game.completions[8]

    if (game.dk_bought[3]) {
        document.getElementById("challenge_header").innerHTML =
            "Entering a challenge will attempt to Reboot, and will reset without giving watts if you cannot<br>To complete a challenge you must Reboot with the required amount of spare PP<br><br>挑战完成次数之和：" +
            format_num(total_completions) +
            "<br>所有挑战的经验值加成合计：" +
            format_num(
                game.ch_boost[0] *
                    game.ch_boost[1] *
                    game.ch_boost[2] *
                    game.ch_boost[3] *
                    game.ch_boost[4] *
                    game.ch_boost[5] *
                    game.ch_boost[6] *
                    game.ch_boost[7] *
                    game.ch_boost[8]
            ) +
            "倍<br>所有挑战的氦加成合计：" +
            format_eff(
                game.ch_helium_boost[0] *
                    game.ch_helium_boost[1] *
                    game.ch_helium_boost[2] *
                    game.ch_helium_boost[3] *
                    game.ch_helium_boost[4] *
                    game.ch_helium_boost[5] *
                    game.ch_helium_boost[6] *
                    game.ch_helium_boost[7] *
                    game.ch_helium_boost[8]
            ) +
            "倍"
    } else {
        document.getElementById("challenge_header").innerHTML =
            "Entering a challenge will attempt to Reboot, and will reset without giving watts if you cannot<br>To complete a challenge you must Reboot with the required amount of spare PP<br><br>挑战完成次数之和：" +
            format_num(total_completions) +
            "<br>所有挑战的经验值加成合计：" +
            format_num(
                game.ch_boost[0] *
                    game.ch_boost[1] *
                    game.ch_boost[2] *
                    game.ch_boost[3] *
                    game.ch_boost[4] *
                    game.ch_boost[5] *
                    game.ch_boost[6] *
                    game.ch_boost[7] *
                    game.ch_boost[8]
            ) +
            "倍"
    }

    if (
        game.completions[8] >= 1 &&
        total_completions < 108 &&
        game.quantum === 0
    ) {
        document.getElementById("challenge_footer").style.display = "block"
    } else {
        document.getElementById("challenge_footer").style.display = "none"
    }

    if (total_completions >= 108 || game.quantum >= 1) {
        document.getElementById("quantum").style.display = "inline"
    } else {
        document.getElementById("quantum").style.display = "none"
    }

    for (const chg of challenge.challenges) {
        let element = challenge_map.get(chg)
        let button = element.querySelector(".enter_button")
        let goal = element.querySelector(".challenge_goal")
        let complete = element.querySelector(".challenge_complete")

        if (game.challenge === chg.id) {
            button.className = "enter_button in_progress"
            button.innerHTML = "IN PROGRESS"
            if (meme) button.disabled = true
        } else {
            button.className = "enter_button"
            button.innerHTML = "ENTER CHALLENGE"
            if (meme) button.disabled = false
        }

        if (game.dk_bought[3]) {
            complete.innerHTML =
                "完成次数：已完成" +
                format_num(game.completions[chg.id - 1]) +
                "次，上限为" +
                format_num(20) +
                "次<br>完成挑战的加成：" +
                format_num(game.ch_boost[chg.id - 1]) +
                "倍经验值，" +
                format_eff(game.ch_helium_boost[chg.id - 1]) +
                "倍氦"
        } else {
            complete.innerHTML =
                "完成次数：已完成" +
                format_num(game.completions[chg.id - 1]) +
                "次，上限为" +
                format_num(12) +
                "次<br>完成挑战的经验值加成：" +
                format_num(game.ch_boost[chg.id - 1]) +
                "倍"
        }

        if (game.completions[chg.id - 1] < 12) {
            goal.innerHTML =
                'Goal: <span class="challenge_pp">' +
                format_num(
                    chg.goal +
                        chg.step * game.completions[chg.id - 1] +
                        (chg.step2 *
                            (game.completions[chg.id - 1] - 1) *
                            game.completions[chg.id - 1]) /
                            2
                ) +
                "转生点</span>"
        } else {
            if (game.dk_bought[3]) {
                if (game.completions[chg.id - 1] < 20) {
                    goal.innerHTML =
                        'Goal: <span class="challenge_pp">' +
                        format_num(
                            chg.goal2 +
                                chg.step3 *
                                    (game.completions[chg.id - 1] - 12) +
                                (chg.step4 *
                                    (game.completions[chg.id - 1] - 13) *
                                    (game.completions[chg.id - 1] - 12)) /
                                    2
                        ) +
                        "转生点</span>"
                } else {
                    goal.innerHTML =
                        'Goal: <span class="challenge_pp">' +
                        format_num(chg.goal2 + chg.step3 * 7 + chg.step4 * 21) +
                        "转生点</span>"
                }
            } else {
                goal.innerHTML =
                    'Goal: <span class="challenge_pp">' +
                    format_num(chg.goal + chg.step * 11 + chg.step2 * 55) +
                    "转生点</span>"
            }
        }

        if (chg.id === 1) {
            element.style.display = "flex"
        } else {
            if (game.completions[chg.id - 2] >= 1) {
                element.style.display = "flex"
            } else {
                element.style.display = "none"
            }
        }
    }
}

//updating reactor page
function reactor_update() {
    if (game.perks[23]) {
        document.getElementById("hydrogen_block1").style.display = "flex"
        document.getElementById("hydrogen1").innerHTML = format_eff(
            game.hydrogen
        )
    }

    document.getElementById("hydrogen2").innerHTML = format_eff(game.hydrogen)

    document.getElementById("helium").innerHTML = format_eff(game.helium)
    document.getElementById("helium_boost").innerHTML =
        "使经验值产量变为" + format_eff(game.helium_boost) + "倍"
    document.getElementById("helium_rate").innerHTML =
        "每秒+" + format_eff(game.hps) + "毫克氦"
    if (game.challenge === 8)
        document.getElementById("helium_rate").innerHTML =
            "每秒+" + format_eff(0) + "毫克氦"

    for (const c of core.cores) {
        let element = reactor_map.get(c)
        let button = element.querySelector(".core_button")
        let power = element.querySelector(".core_power")

        element.querySelector(".core_id").innerHTML = "核心" + format_num(c.id)

        if (c.id === 0) {
            power.innerHTML =
                "每秒氦基础产量" + format_eff(game.core_level[c.id]) + "毫克"
        } else {
            power.innerHTML =
                "氦产量变为" + format_num(game.core_level[c.id] + 1) + "倍"
            if (game.core_level[c.id - 1] >= 1) {
                element.style.display = "flex"
            } else {
                element.style.display = "none"
            }
        }

        button.innerHTML =
            "-" + format_eff(game.core_price[c.id]) + "克氢"

        if (game.hydrogen >= game.core_price[c.id]) {
            button.className = "core_button core_unlocked"
            if (meme) button.disabled = false
        } else {
            button.className = "core_button core_locked"
            if (meme) button.disabled = true
        }
    }

    if (game.core_level[2] >= 1) {
        document.getElementById("power_supply").style.display = "flex"
        if (game.hydrogen >= game.supply_price) {
            document.getElementById("supply_button").className =
                "core_button core_unlocked"
            if (meme) document.getElementById("supply_button").disabled = false
        } else {
            document.getElementById("supply_button").className =
                "core_button core_locked"
            if (meme) document.getElementById("supply_button").disabled = true
        }
    } else {
        document.getElementById("power_supply").style.display = "none"
    }
    document.getElementById("supply_gain").innerHTML =
        "氢产量变为" + format_eff(2 ** game.supply_level) + "倍"
    if (game.perks[26])
        document.getElementById("supply_gain").innerHTML =
            "氢产量变为" + format_eff(2.5 ** game.supply_level) + "倍"
    if (game.dk_bought[5])
        document.getElementById("supply_gain").innerHTML =
            "氢产量变为" + format_eff(3 ** game.supply_level) + "倍"
    document.getElementById("supply_button").innerHTML =
        "-" + format_eff(game.supply_price) + "克氢"

    if (game.core_level[7] >= 1 || game.quantum >= 1) {
        document.getElementById("reactor_buy_max").style.display = "inline"
        document.getElementById("max_buttons").style.display = "flex"
    } else {
        document.getElementById("reactor_buy_max").style.display = "none"
        document.getElementById("max_buttons").style.display = "none"
    }

    if (
        game.core_level[7] >= 7 ||
        (game.core_level[7] >= 1 && game.quantum >= 1)
    ) {
        document.getElementById("reactor_max_all").style.display = "inline"

        if (game.qu_bought[0]) {
            document.getElementById("reactor_max_half").style.display = "inline"
        } else {
            document.getElementById("reactor_max_half").style.display = "none"
        }
    } else {
        document.getElementById("reactor_max_all").style.display = "none"
        document.getElementById("reactor_max_half").style.display = "none"
    }

    if (game.qu_bought[4]) {
        document.getElementById("autohy_block").style.display = "block"
    } else {
        document.getElementById("autohy_block").style.display = "none"
    }
}

//updating prism page
function prism_update() {
    document.getElementById("photons").innerHTML = format_infinity(game.photons)
    if (game.photons.cmp(1) === 0 && game.notation !== 8)
        document.getElementById("photons_text").innerHTML = "光子"
    else document.getElementById("photons_text").innerHTML = "光子"

    let total_completions =
        game.completions[0] +
        game.completions[1] +
        game.completions[2] +
        game.completions[3] +
        game.completions[4] +
        game.completions[5] +
        game.completions[6] +
        game.completions[7] +
        game.completions[8]

    let highest_level = game.reboot_highest_level
    if (game.highest_level > highest_level) highest_level = game.highest_level
    if (game.level > highest_level) highest_level = game.level

    let amount = Decimal.pow(1000, (highest_level - 65536) / 16384).floor()
    if (amount.cmp(Decimal.pow(2, 1024)) >= 0)
        amount = amount
            .div(Decimal.pow(2, 1024))
            .pow(0.5)
            .mul(Decimal.pow(2, 1024))
            .floor()

    if (total_completions >= 108 && amount.cmp(1) >= 0) {
        document.getElementById("quantize_button").className = "lit"
        document.getElementById("photons_up").style.display = "block"
        if (meme) document.getElementById("quantize_button").disabled = false
        if (amount.cmp(1) === 0 && game.notation !== 8)
            document.getElementById("photons_up").innerHTML =
                "+" + format_infinity(amount) + "光子"
        else
            document.getElementById("photons_up").innerHTML =
                "+" + format_infinity(amount) + "光子"
    } else {
        document.getElementById("quantize_button").className = "unlit"
        if (meme) document.getElementById("quantize_button").disabled = true
        if (amount.cmp(1) >= 0) {
            document.getElementById("photons_up").style.display = "block"
            if (amount === 1 && game.notation !== 8)
                document.getElementById("photons_up").innerHTML =
                    "+" + format_infinity(amount) + "光子"
            else
                document.getElementById("photons_up").innerHTML =
                    "+" + format_infinity(amount) + "光子"
        } else {
            document.getElementById("photons_up").style.display = "none"
        }
    }

    if (game.dk_bought[1]) {
        document.getElementById("quantize_footer").innerHTML =
            "Photons gained are based on your Highest Level (Current Iteration)"
    } else {
        document.getElementById("quantize_footer").innerHTML =
            "Photons gained are based on your Highest Level (Current Iteration)<br>They don't do anything by themselves, and are only for spending"
    }

    if (game.quantum >= 1) {
        document.getElementById("quantum_confirm").style.display = "flex"
    } else {
        document.getElementById("quantum_confirm").style.display = "none"
    }

    document.getElementById("prism_lvl_num").innerHTML = format_lvl(
        game.prism_level
    )
    document.getElementById("prism_level2").innerHTML =
        "棱镜" + format_lvl(game.prism_level) + "级"
    document.getElementById("prism_boost").innerHTML =
        "使瓦特获取速度变为" + format_num(game.prism_boost * game.om_boost[0]) + "倍"
    document.getElementById("prism_boost2").innerHTML =
        "使瓦特获取速度变为" + format_num(game.prism_boost * game.om_boost[0]) + "倍"
    document.getElementById("prism_button").innerHTML =
        "-" + format_infinity(game.prism_price) + "光子"
    if (game.prism_price.cmp(1) === 0)
        document.getElementById("prism_button").innerHTML =
            "-" + format_infinity(game.prism_price) + "光子"

    if (game.prism_level >= 1)
        document.getElementById("prism").className = "prism_lit"
    else document.getElementById("prism").className = ""

    if (game.photons.cmp(game.prism_price) >= 0) {
        document.getElementById("prism_button").className = "lit"
        if (meme) document.getElementById("prism_button").disabled = false
    } else {
        document.getElementById("prism_button").className = "unlit"
        if (meme) document.getElementById("prism_button").disabled = true
    }

    //quantum upgrades handling
    for (const upgrade of quantum_upgrade.upgrades) {
        let element = quantum_map.get(upgrade)
        let button = element.querySelector(".qu_button")

        if (game.qu_bought[upgrade.id]) {
            button.className = "qu_button superlit"
            button.innerHTML = "PURCHASED"
            if (meme) button.disabled = true
        } else {
            button.innerHTML = "-" + format_num(upgrade.price) + "光子"
            if (game.photons.cmp(upgrade.price) >= 0) {
                button.className = "qu_button lit"
                if (meme) button.disabled = false
            } else {
                button.className = "qu_button unlit"
                if (meme) button.disabled = true
            }
        }
    }

    if (game.qu_bought[3]) {
        game.superspeed_power =
            5 **
                (Math.log(game.fastest_quantize / (6400 * game.tickspeed)) /
                    Math.log(0.5) +
                    1) +
            1
    } else {
        game.superspeed_power = 1
    }

    if (game.dk_bought[2] && !game.omega_challenge) {
        document.getElementById("autoqu_block").style.display = "block"
        document.getElementById("photon_auto").style.display = "inline"

        if (game.om_bought[1]) {
            document.getElementById("step_mode").style.display = "inline"

            if (game.prev_photons === 0) {
                document.getElementById("step_goal").innerHTML =
                    "当前量子化目标：" +
                    format_num(Math.ceil(game.autoqu_goal[2])) +
                    "光子"
            } else {
                document.getElementById("step_goal").innerHTML =
                    "当前量子化目标：" +
                    format_num(
                        Math.ceil(game.prev_photons * game.autoqu_goal[2])
                    ) +
                    "光子"
            }
        } else {
            document.getElementById("step_mode").style.display = "none"
        }
    } else {
        document.getElementById("autoqu_block").style.display = "none"
    }

    if (game.dk_bought[7]) {
        document.getElementById("omega_tab").style.display = "inline"
    } else {
        document.getElementById("omega_tab").style.display = "none"
    }

    if (game.om_bought[3]) {
        document.getElementById("prism_auto").style.display = "inline"
    } else {
        document.getElementById("prism_auto").style.display = "none"
    }

    //prism animation
    if (game.tab === 4) {
        let prism = document.getElementById("prism")
        let ctx = prism.getContext("2d")

        ctx.clearRect(0, 0, prism.width, prism.height)

        ctx.beginPath()
        ctx.moveTo(
            250 + 175 * 2 ** 0.5 * Math.cos(prism_angle),
            100 -
                175 * 2 ** 0.5 * Math.sin(Math.PI / 18) * Math.sin(prism_angle)
        )
        ctx.lineTo(
            250 + 175 * 2 ** 0.5 * Math.cos(prism_angle + Math.PI / 2),
            100 -
                175 *
                    2 ** 0.5 *
                    Math.sin(Math.PI / 18) *
                    Math.sin(prism_angle + Math.PI / 2)
        )
        ctx.moveTo(
            250 + 175 * 2 ** 0.5 * Math.cos(prism_angle + Math.PI / 2),
            100 -
                175 *
                    2 ** 0.5 *
                    Math.sin(Math.PI / 18) *
                    Math.sin(prism_angle + Math.PI / 2)
        )
        ctx.lineTo(
            250 + 175 * 2 ** 0.5 * Math.cos(prism_angle + Math.PI),
            100 -
                175 *
                    2 ** 0.5 *
                    Math.sin(Math.PI / 18) *
                    Math.sin(prism_angle + Math.PI)
        )
        ctx.moveTo(
            250 + 175 * 2 ** 0.5 * Math.cos(prism_angle + Math.PI),
            100 -
                175 *
                    2 ** 0.5 *
                    Math.sin(Math.PI / 18) *
                    Math.sin(prism_angle + Math.PI)
        )
        ctx.lineTo(
            250 + 175 * 2 ** 0.5 * Math.cos(prism_angle + (3 * Math.PI) / 2),
            100 -
                175 *
                    2 ** 0.5 *
                    Math.sin(Math.PI / 18) *
                    Math.sin(prism_angle + (3 * Math.PI) / 2)
        )
        ctx.moveTo(
            250 + 175 * 2 ** 0.5 * Math.cos(prism_angle + (3 * Math.PI) / 2),
            100 -
                175 *
                    2 ** 0.5 *
                    Math.sin(Math.PI / 18) *
                    Math.sin(prism_angle + (3 * Math.PI) / 2)
        )
        ctx.lineTo(
            250 + 175 * 2 ** 0.5 * Math.cos(prism_angle),
            100 -
                175 * 2 ** 0.5 * Math.sin(Math.PI / 18) * Math.sin(prism_angle)
        )
        ctx.moveTo(
            250 + 175 * 2 ** 0.5 * Math.cos(prism_angle),
            100 -
                175 * 2 ** 0.5 * Math.sin(Math.PI / 18) * Math.sin(prism_angle)
        )
        ctx.lineTo(250, 100 - 350 * Math.sin((-4 * Math.PI) / 9))
        ctx.moveTo(
            250 + 175 * 2 ** 0.5 * Math.cos(prism_angle + Math.PI / 2),
            100 -
                175 *
                    2 ** 0.5 *
                    Math.sin(Math.PI / 18) *
                    Math.sin(prism_angle + Math.PI / 2)
        )
        ctx.lineTo(250, 100 - 350 * Math.sin((-4 * Math.PI) / 9))
        ctx.moveTo(
            250 + 175 * 2 ** 0.5 * Math.cos(prism_angle + Math.PI),
            100 -
                175 *
                    2 ** 0.5 *
                    Math.sin(Math.PI / 18) *
                    Math.sin(prism_angle + Math.PI)
        )
        ctx.lineTo(250, 100 - 350 * Math.sin((-4 * Math.PI) / 9))
        ctx.moveTo(
            250 + 175 * 2 ** 0.5 * Math.cos(prism_angle + (3 * Math.PI) / 2),
            100 -
                175 *
                    2 ** 0.5 *
                    Math.sin(Math.PI / 18) *
                    Math.sin(prism_angle + (3 * Math.PI) / 2)
        )
        ctx.lineTo(250, 100 - 350 * Math.sin((-4 * Math.PI) / 9))

        ctx.lineWidth = 10
        ctx.lineCap = "round"
        ctx.strokeStyle = "white"
        if (meme) ctx.strokeStyle = "black"
        ctx.stroke()
    }
}

//updating gravity well page
function gravity_update() {
    if (
        !game.om_bought[6] &&
        game.dark_matter.cmp(1.7976931348622053 * 10 ** 308) >= 0
    )
        document.getElementById("dark_matter").innerHTML = "∞"
    else
        document.getElementById("dark_matter").innerHTML = format_eff_infinity(
            game.dark_matter
        )
    document.getElementById("dark_matter_boost").innerHTML =
        "使经验值产量变为" + format_eff(game.dark_matter_boost) + "倍"
    if (game.dk_bought[6])
        document.getElementById("dark_matter_boost").innerHTML =
            "使经验值产量变为" +
            format_eff(game.dark_matter_boost) +
            "倍<br>并使氦产量变为" +
            format_eff(game.dark_matter_boost ** 0.2) +
            "倍"
    if (game.challenge === 7) {
        document.getElementById("dark_matter_boost").innerHTML =
            "使经验值产量变为" + format_eff(1) + "倍"
        if (game.dk_bought[6])
            document.getElementById("dark_matter_boost").innerHTML =
                "使经验值产量变为" +
                format_eff(1) +
                "倍<br>并使氦产量变为" +
                format_eff(1) +
                "倍"
    }

    let penalty = 1
    if (
        game.dark_matter.cmp(1.7976931348622053 * 10 ** 308) === 1 ||
        game.dark_matter.cmp(1.7976931348622053 * 10 ** 308) === 0
    )
        penalty =
            0.25 ** (game.dark_matter.log(1.7976931348622053 * 10 ** 308) - 1)

    if (game.omega_level >= 1) {
        document.getElementById("omega_level").style.display = "block"
        document.getElementById("omega_level_text").innerHTML =
            "" + format_num(game.omega_level) + "级欧米伽"
        document.getElementById("growth_penalty").innerHTML =
            "有效增长系数为" +
            format_eff(
                (game.growth_factor * game.op_dark_boost) **
                    (0.5 ** game.omega_level),
                true
            ) +
            "倍"
        if (game.om_bought[2]) {
            document.getElementById("growth_penalty").innerHTML =
                "有效增长系数为" +
                format_eff(
                    (game.growth_factor *
                        1.15 ** game.highest_omega_level *
                        game.op_dark_boost) **
                        (0.5 ** game.omega_level),
                    true
                ) +
                "倍"
            if (game.om_bought[4])
                document.getElementById("growth_penalty").innerHTML =
                    "有效增长系数为" +
                    format_eff(
                        (game.growth_factor *
                            1.15 ** game.highest_omega_level *
                            game.op_dark_boost) **
                            ((2 / 3) ** game.omega_level),
                        true
                    ) +
                    "倍"
        }
    } else {
        document.getElementById("omega_level").style.display = "none"
    }

    document.getElementById("interval_text").innerHTML =
        "增长间隔<br>" +
        format_eff(game.growth_interval / game.tickspeed) +
        "秒"
    if (game.growth_interval > 1) {
        document.getElementById("interval_button").innerHTML =
            "-" + format_infinity(game.growth_price[0]) + "光子"
        if (game.photons.cmp(game.growth_price[0]) >= 0) {
            document.getElementById("interval_button").className = "lit"
            if (meme)
                document.getElementById("interval_button").disabled = false
        } else {
            document.getElementById("interval_button").className = "unlit"
            if (meme) document.getElementById("interval_button").disabled = true
        }
    } else {
        document.getElementById("interval_button").innerHTML = "MAXED"
        document.getElementById("interval_button").className = "superlit"
        if (meme) document.getElementById("interval_button").disabled = true
    }
    document.getElementById("growth_text").innerHTML =
        "增长系数<br>" +
        format_eff(game.growth_factor * game.op_dark_boost, true) +
        "倍"
    if (game.om_bought[2])
        document.getElementById("growth_text").innerHTML =
            "增长系数<br>" +
            format_eff(
                game.growth_factor *
                    1.15 ** game.highest_omega_level *
                    game.op_dark_boost,
                true
            ) +
            "倍"
    document.getElementById("growth_button").innerHTML =
        "-" + format_infinity(game.growth_price[1]) + "光子"
    if (game.photons.cmp(game.growth_price[1]) >= 0) {
        document.getElementById("growth_button").className = "lit"
        if (meme) document.getElementById("growth_button").disabled = false
    } else {
        document.getElementById("growth_button").className = "unlit"
        if (meme) document.getElementById("growth_button").disabled = true
    }

    if (game.dk_bought[7]) {
        document.getElementById("growth_reset").style.display = "block"
        if (
            game.dark_matter.cmp(1.7976931348622053 * 10 ** 308) === 1 ||
            game.dark_matter.cmp(1.7976931348622053 * 10 ** 308) === 0
        ) {
            document.getElementById("collapse_button").className = "lit"
            if (meme)
                document.getElementById("collapse_button").disabled = false
        } else {
            document.getElementById("collapse_button").className = "unlit"
            if (meme) document.getElementById("collapse_button").disabled = true
        }
        if (
            game.dark_matter.cmp(1.7976931348622053 * 10 ** 308) === -1 ||
            game.om_bought[6]
        )
            document.getElementById("collapse_time").style.display = "block"
        else document.getElementById("collapse_time").style.display = "none"
        if (game.dark_matter.cmp(1.7976931348622053 * 10 ** 308) <= 0) {
            document.getElementById("collapse_time").innerHTML =
                "" +
                format_time(
                    (Math.log(
                        (1.7976931348622053 * 10 ** 308) /
                            game.dark_matter.toNumber()
                    ) /
                        Math.log(
                            (game.growth_factor * game.op_dark_boost) **
                                (0.5 ** game.omega_level)
                        )) *
                        game.growth_interval
                ) + "后可以坍缩"
            if (game.om_bought[2]) {
                document.getElementById("collapse_time").innerHTML =
                    "" +
                    format_time(
                        (Math.log(
                            (1.7976931348622053 * 10 ** 308) /
                                game.dark_matter.toNumber()
                        ) /
                            Math.log(
                                (game.growth_factor *
                                    1.15 ** game.highest_omega_level *
                                    game.op_dark_boost) **
                                    (0.5 ** game.omega_level)
                            )) *
                            game.growth_interval
                    ) + "后可以坍缩"

                if (game.om_bought[4])
                    document.getElementById("collapse_time").innerHTML =
                        "" +
                        format_time(
                            (Math.log(
                                (1.7976931348622053 * 10 ** 308) /
                                    game.dark_matter.toNumber()
                            ) /
                                Math.log(
                                    (game.growth_factor *
                                        1.15 ** game.highest_omega_level *
                                        game.op_dark_boost) **
                                        ((2 / 3) ** game.omega_level)
                                )) *
                                game.growth_interval
                        ) + "后可以坍缩"
            }
        } else {
            let next = Decimal.pow(
                10,
                100 * Math.floor(game.dark_matter.log(10) / 100) + 100
            )
            let f =
                (game.growth_factor * game.op_dark_boost) **
                (0.5 ** game.omega_level)
            if (game.om_bought[4])
                f =
                    (game.growth_factor * game.op_dark_boost) **
                    ((2 / 3) ** game.omega_level)
            if (game.om_bought[2]) {
                f =
                    (game.growth_factor *
                        1.15 ** game.highest_omega_level *
                        game.op_dark_boost) **
                    (0.5 ** game.omega_level)
                if (game.om_bought[4]) {
                    f =
                        (game.growth_factor *
                            1.15 ** game.highest_omega_level *
                            game.op_dark_boost) **
                        ((2 / 3) ** game.omega_level)
                }
            }
            let time = next
                .pow(1 / 512)
                .sub(game.dark_matter.pow(1 / 512))
                .mul((128 * game.growth_interval) / Math.log(f))
                .toNumber()
            document.getElementById("collapse_time").innerHTML =
                "有效增长系数为" +
                format_eff(f ** penalty, true) +
                "倍<br>" +
                format_eff_infinity(next) +
                "千克暗物质，耗时" +
                format_time(time)
        }

        if (game.om_bought[4]) {
            document.getElementById("collapse_text").innerHTML =
                "Resets dark matter,<br>and Growth Factor ^0.67"
        } else {
            document.getElementById("collapse_text").innerHTML =
                "Resets dark matter,<br>and Growth Factor ^0.5"
        }
        if (game.notation === 8)
            document.getElementById("collapse_text").innerHTML =
                "Resets dark matter,<br>and Growth Factor ^???"
    } else {
        document.getElementById("growth_reset").style.display = "none"
        if (
            game.dark_matter.cmp(1.7976931348622053 * 10 ** 308) === -1 &&
            game.achievements[144]
        )
            document.getElementById("collapse_time").style.display = "block"
        else document.getElementById("collapse_time").style.display = "none"
        document.getElementById("collapse_time").innerHTML =
            "" +
            format_time(
                (Math.log(
                    (1.7976931348622053 * 10 ** 308) /
                        game.dark_matter.toNumber()
                ) /
                    Math.log(
                        (game.growth_factor * game.op_dark_boost) **
                            (0.7 ** game.omega_level)
                    )) *
                    game.growth_interval
            ) + "后达到无限暗物质"
    }

    if (!meme) {
        if (
            game.dark_matter >= 1.7976931348622053 * 10 ** 308 &&
            game.notation !== 9 &&
            !game.om_bought[6]
        ) {
            document.documentElement.style.setProperty(
                "--dark_matter_size",
                "3em"
            )
            document.getElementById("dark_matter").style.marginTop = "0.2em"
            document.getElementById("dark_matter").style.marginBottom =
                "-0.28em"
        } else {
            document.documentElement.style.setProperty(
                "--dark_matter_size",
                "2em"
            )
            document.getElementById("dark_matter").style.marginTop = "0.68em"
            document.getElementById("dark_matter").style.marginBottom =
                "-0.18em"
        }
    }

    //dark upgrades handling
    for (const upgrade of dark_upgrade.upgrades) {
        let element = quantum_map.get(upgrade)
        let button = element.querySelector(".qu_button")

        if (game.dk_bought[upgrade.id]) {
            button.className = "qu_button superlit"
            button.innerHTML = "PURCHASED"
            if (meme) button.disabled = true
        } else {
            button.innerHTML = "-" + format_num(upgrade.price) + "光子"
            if (game.photons.cmp(upgrade.price) >= 0) {
                button.className = "qu_button lit"
                if (meme) button.disabled = false
            } else {
                button.className = "qu_button unlit"
                if (meme) button.disabled = true
            }
        }
    }

    if (game.dk_bought[1]) {
        if (game.photons.cmp(0) === 1) {
            if (
                Decimal.ln(
                    game.photons
                        .mul(Math.exp(12 ** 0.2))
                        .div(dark_upgrade.upgrades[1].price)
                ) **
                    5 +
                    1 >=
                1
            )
                game.infusion =
                    Decimal.ln(
                        game.photons
                            .mul(Math.exp(12 ** 0.2))
                            .div(dark_upgrade.upgrades[1].price)
                    ) **
                        5 +
                    1
            else game.infusion = 1
        } else {
            game.infusion = 1
        }
    } else {
        game.infusion = 1
    }

    if (game.om_bought[5]) {
        document.getElementById("growth_auto").style.display = "inline"
    } else {
        document.getElementById("growth_auto").style.display = "none"
    }
}

//updating omega drive page
function omega_update() {
    document.getElementById("omega_points").innerHTML = format_num(
        game.omega_points
    )
    document.getElementById("highest_omega_level").innerHTML =
        "欧米伽等级最高为" + format_num(game.highest_omega_level) + "级"
    if (game.free_omega_points >= 1 && !game.omega_challenge)
        document.getElementById("highest_omega_level").innerHTML =
            "欧米伽等级最高为" +
            format_num(game.highest_omega_level) +
            "级<br>免费Ω+" +
            format_num(game.free_omega_points) +
            ""

    document.getElementById("prism_assigned").innerHTML =
        "已分配" + format_num(game.om_assigned[0]) +
        "Ω<br>棱镜倍率变为" +
        format_num(game.om_boost[0]) +
        "倍"
    document.getElementById("reactor_assigned").innerHTML =
        "已分配" + format_num(game.om_assigned[1]) +
        "Ω<br>氦产量变为" +
        format_num(game.om_boost[1]) +
        "倍"
    document.getElementById("dark_matter_assigned").innerHTML =
        "已分配" + format_num(game.om_assigned[2]) +
        "Ω<br>暗物质公式变为" +
        format_eff(game.om_boost[2]) + "次方"

    //omega upgrades handling
    for (const upgrade of omega_upgrade.upgrades) {
        let element = quantum_map.get(upgrade)
        let button = element.querySelector(".qu_button")

        if (game.om_bought[upgrade.id]) {
            button.className = "qu_button superlit"
            button.innerHTML = "PURCHASED"
            if (meme) button.disabled = true
        } else {
            button.innerHTML = "-" + format_num(upgrade.price) + "光子"
            if (game.photons.cmp(upgrade.price) >= 0) {
                button.className = "qu_button lit"
                if (meme) button.disabled = false
            } else {
                button.className = "qu_button unlit"
                if (meme) button.disabled = true
            }
        }
    }

    if (game.om_bought[0]) {
        document.getElementById("collapse_auto").style.display = "inline"
    } else {
        document.getElementById("collapse_auto").style.display = "none"
    }

    if (game.om_bought[7]) {
        document.getElementById("omega_challenge_block").style.display = "block"
        if (game.omega_challenge) {
            document.getElementById("omega_enter_button").className =
                "omega_in_progress"
            document.getElementById("omega_enter_button").innerHTML =
                "IN PROGRESS"
            if (meme)
                document.getElementById("omega_enter_button").disabled = true
        } else {
            let total_completions =
                game.completions[0] +
                game.completions[1] +
                game.completions[2] +
                game.completions[3] +
                game.completions[4] +
                game.completions[5] +
                game.completions[6] +
                game.completions[7] +
                game.completions[8]

            let highest_level = game.reboot_highest_level
            if (game.highest_level > highest_level)
                highest_level = game.highest_level
            if (game.level > highest_level) highest_level = game.level

            let amount = Decimal.pow(
                1000,
                (highest_level - 65536) / 16384
            ).floor()

            if (total_completions >= 108 && amount.cmp(1) >= 0) {
                document.getElementById("omega_enter_button").className =
                    "can_enter"
                if (meme)
                    document.getElementById(
                        "omega_enter_button"
                    ).disabled = false
            } else {
                document.getElementById("omega_enter_button").className =
                    "cannot_enter"
                if (meme)
                    document.getElementById(
                        "omega_enter_button"
                    ).disabled = true
            }

            document.getElementById("omega_enter_button").innerHTML =
                "ENTER CHALLENGE"
        }

        document.getElementById("omega_challenge_desc").innerHTML =
            "经验值产量变为" + format_eff(0.5) + "次方"

        let growth_factor_boost =
            "增长系数加成：" + format_eff(game.op_dark_boost) + "倍"
        let free_omega_points =
            "免费欧米伽：+" + format_num(game.free_omega_points) + "Ω"
        let next_at =
            "下一个需要" +
            format_infinity(
                Decimal.pow(150, game.free_omega_points).mul(2 * 10 ** 16)
            ) +
            "光子"
        if (game.free_omega_points >= 5)
            next_at =
                "下一个需要" +
                format_infinity(
                    Decimal.pow(
                        150,
                        5 * ((game.free_omega_points + 1) / 5) ** 2 - 1
                    ).mul(2 * 10 ** 16)
                ) +
                "光子"

        document.getElementById("omega_challenge_boosts").innerHTML =
            growth_factor_boost +
            "<br>" +
            free_omega_points +
            "(" +
            next_at +
            ")"

        document.getElementById("omega_challenge_best").innerHTML =
            'Best photons: <span class="challenge_photons">' +
            format_infinity(game.omega_best) +
            "光子</span>"
    } else {
        document.getElementById("omega_challenge_block").style.display = "none"
    }
}

//updating achievements page
function achievements_update() {
    for (let i = 0; i < 10; i++) {
        let p = i + game.achiev_page * 10
        if (p < achievement.achievements.length) {
            let r = achievement.achievements[p].id
            document.getElementById("slot" + (i + 1)).style.display = "block"
            if (game.achievements[r]) {
                document.getElementById("ach_header" + (i + 1)).innerHTML =
                    achievement.achievements[p].name
                if (!meme) {
                    if (p === 26) {
                        document.getElementById(
                            "ach_header" + (i + 1)
                        ).style.color =
                            "hsl(" +
                            (((game.all_time * 108) / game.tickspeed) % 360) +
                            ",100%,67%)"
                    } else {
                        document.getElementById(
                            "ach_header" + (i + 1)
                        ).style.color = "#00ff00"
                    }
                }
                document.getElementById("ach_reqr" + (i + 1)).innerHTML =
                    achievement.achievements[p].requirement
                document.getElementById("slot" + (i + 1)).className =
                    "achievement_slot achievement_complete"
                if (achievement.achievements[p].new) {
                    document.getElementById("slot" + (i + 1)).className =
                        "achievement_slot achievement_complete achievement_new"
                }
            } else {
                document.getElementById("ach_header" + (i + 1)).innerHTML =
                    "?????"
                if (!meme)
                    document.getElementById(
                        "ach_header" + (i + 1)
                    ).style.color = "#ff0000"
                document.getElementById("slot" + (i + 1)).className =
                    "achievement_slot"

                switch (achievement.achievements[p].spoiler) {
                    case 0:
                        document.getElementById(
                            "ach_reqr" + (i + 1)
                        ).innerHTML = achievement.achievements[p].requirement
                        break
                    case 1:
                        if (
                            game.prestige >= 1 ||
                            game.reboot >= 1 ||
                            game.quantum >= 1
                        )
                            document.getElementById(
                                "ach_reqr" + (i + 1)
                            ).innerHTML =
                                achievement.achievements[p].requirement
                        else
                            document.getElementById(
                                "ach_reqr" + (i + 1)
                            ).innerHTML = "?????"
                        break
                    case 2:
                        if (
                            game.pp_bought[6] ||
                            game.reboot >= 1 ||
                            game.quantum >= 1
                        )
                            document.getElementById(
                                "ach_reqr" + (i + 1)
                            ).innerHTML =
                                achievement.achievements[p].requirement
                        else
                            document.getElementById(
                                "ach_reqr" + (i + 1)
                            ).innerHTML = "?????"
                        break
                    case 3:
                        if (game.reboot >= 1 || game.quantum >= 1)
                            document.getElementById(
                                "ach_reqr" + (i + 1)
                            ).innerHTML =
                                achievement.achievements[p].requirement
                        else
                            document.getElementById(
                                "ach_reqr" + (i + 1)
                            ).innerHTML = "?????"
                        break
                    case 4:
                        if (game.perks[17] || game.quantum >= 1)
                            document.getElementById(
                                "ach_reqr" + (i + 1)
                            ).innerHTML =
                                achievement.achievements[p].requirement
                        else
                            document.getElementById(
                                "ach_reqr" + (i + 1)
                            ).innerHTML = "?????"
                        break
                    case 5:
                        if (game.perks[23] || game.quantum >= 1)
                            document.getElementById(
                                "ach_reqr" + (i + 1)
                            ).innerHTML =
                                achievement.achievements[p].requirement
                        else
                            document.getElementById(
                                "ach_reqr" + (i + 1)
                            ).innerHTML = "?????"
                        break
                    case 6:
                        if (game.quantum >= 1)
                            document.getElementById(
                                "ach_reqr" + (i + 1)
                            ).innerHTML =
                                achievement.achievements[p].requirement
                        else
                            document.getElementById(
                                "ach_reqr" + (i + 1)
                            ).innerHTML = "?????"
                        break
                    case 7:
                        if (game.qu_bought[7])
                            document.getElementById(
                                "ach_reqr" + (i + 1)
                            ).innerHTML =
                                achievement.achievements[p].requirement
                        else
                            document.getElementById(
                                "ach_reqr" + (i + 1)
                            ).innerHTML = "?????"
                        break
                    case 8:
                        if (game.dk_bought[3])
                            document.getElementById(
                                "ach_reqr" + (i + 1)
                            ).innerHTML =
                                achievement.achievements[p].requirement
                        else
                            document.getElementById(
                                "ach_reqr" + (i + 1)
                            ).innerHTML = "?????"
                        break
                    case 9:
                        if (game.dk_bought[7])
                            document.getElementById(
                                "ach_reqr" + (i + 1)
                            ).innerHTML =
                                achievement.achievements[p].requirement
                        else
                            document.getElementById(
                                "ach_reqr" + (i + 1)
                            ).innerHTML = "?????"
                        break
                    case 10:
                        if (game.om_bought[6])
                            document.getElementById(
                                "ach_reqr" + (i + 1)
                            ).innerHTML =
                                achievement.achievements[p].requirement
                        else
                            document.getElementById(
                                "ach_reqr" + (i + 1)
                            ).innerHTML = "?????"
                        break
                    case 11:
                        if (game.om_bought[7])
                            document.getElementById(
                                "ach_reqr" + (i + 1)
                            ).innerHTML =
                                achievement.achievements[p].requirement
                        else
                            document.getElementById(
                                "ach_reqr" + (i + 1)
                            ).innerHTML = "?????"
                        break
                }
            }
        } else {
            document.getElementById("slot" + (i + 1)).style.display = "none"
        }
    }

    let ach_completed = 0
    for (let i = 0; i < achievement.achievements.length; i++) {
        if (game.achievements[i]) ach_completed++
    }
    document.getElementById("achievement_count").innerHTML =
        "成就获取数量：已获取" +
        format_num(ach_completed) +
        "个，上限为" +
        format_num(achievement.achievements.length) + "个"
    if (game.perks[0]) {
        document.getElementById("achievement_count").innerHTML =
            "成就获取数量：已获取" +
            format_num(ach_completed) +
            "个，上限为" +
            format_num(achievement.achievements.length) +
            "个<br>成就的经验值加成：" +
            format_eff(game.ach_power) +
            "倍"
    }

    document.getElementById("page_text1").innerHTML =
        "第" + format_num(game.achiev_page + 1) + "页"
    document.getElementById("page_text2").innerHTML =
        "第" + format_num(game.achiev_page + 1) + "页"
}

//updating descriptions of various things
function description_update() {
    pp_upgrade.upgrades[1].desc =
        "自动点击的速度变为" + format_num(2) + "倍"
    pp_map.get(pp_upgrade.upgrades[1]).querySelector(".pp_desc").innerHTML =
        pp_upgrade.upgrades[1].desc
    pp_upgrade.upgrades[4].desc =
        "自动点击的速度变为" + format_num(3) + "倍"
    pp_map.get(pp_upgrade.upgrades[4]).querySelector(".pp_desc").innerHTML =
        pp_upgrade.upgrades[4].desc
    pp_upgrade.upgrades[6].desc =
        "突破界限，使等级可以超过" +
        format_lvl(60) +
        '级<br>并解锁自动转生设置<br><span class="small_text">(请小心！超过' +
        format_lvl(60) +
        "级后，转生点的获取将改为基于最高等级)</span>"
    pp_map.get(pp_upgrade.upgrades[6]).querySelector(".pp_desc").innerHTML =
        pp_upgrade.upgrades[6].desc
    pp_upgrade.upgrades[7].desc =
        "从下次转生起，初始状态下就有" + format_lvl(15) + "级"
    pp_map.get(pp_upgrade.upgrades[7]).querySelector(".pp_desc").innerHTML =
        pp_upgrade.upgrades[7].desc
    pp_upgrade.upgrades[10].desc =
        "从下次转生起，初始状态下就有" + format_lvl(30) + "级"
    pp_map.get(pp_upgrade.upgrades[10]).querySelector(".pp_desc").innerHTML =
        pp_upgrade.upgrades[10].desc
    pp_upgrade.upgrades[11].desc =
        "自动点击的速度变为" + format_num(4) + "倍"
    pp_map.get(pp_upgrade.upgrades[11]).querySelector(".pp_desc").innerHTML =
        pp_upgrade.upgrades[11].desc
    pp_upgrade.upgrades[13].desc =
        "从下次转生起，初始状态下就有" + format_lvl(45) + "级"
    pp_map.get(pp_upgrade.upgrades[13]).querySelector(".pp_desc").innerHTML =
        pp_upgrade.upgrades[13].desc
    pp_upgrade.upgrades[17].desc =
        "自动点击的速度变为" + format_num(6) + "倍"
    pp_map.get(pp_upgrade.upgrades[17]).querySelector(".pp_desc").innerHTML =
        pp_upgrade.upgrades[17].desc
    pp_upgrade.upgrades[19].desc =
        "经验超频的经验值加成效果变为" + format_num(4) + "倍"
    pp_map.get(pp_upgrade.upgrades[19]).querySelector(".pp_desc").innerHTML =
        pp_upgrade.upgrades[19].desc
    pp_upgrade.upgrades[23].desc =
        "经验超频的经验值加成效果变为" + format_num(5) + "倍"
    pp_map.get(pp_upgrade.upgrades[23]).querySelector(".pp_desc").innerHTML =
        pp_upgrade.upgrades[23].desc
    pp_upgrade.upgrades[27].desc =
        "EXP production is boosted based on how many times you have Prestiged<br>(当前效果：" +
        format_eff(
            1 + ((game.prestige + game.banked_prestige) / 1000) ** (1 / 2)
        ) +
        "倍)"
    pp_map.get(pp_upgrade.upgrades[27]).querySelector(".pp_desc").innerHTML =
        pp_upgrade.upgrades[27].desc
    pp_upgrade.upgrades[30].desc =
        "EXP production is boosted based on your highest level<br>(当前效果：" +
        format_eff(1 + game.highest_level / 400) +
        "倍)"
    pp_map.get(pp_upgrade.upgrades[30]).querySelector(".pp_desc").innerHTML =
        pp_upgrade.upgrades[30].desc
    pp_upgrade.upgrades[31].desc =
        "经验电池的效果变为" + format_num(3) + "倍"
    pp_map.get(pp_upgrade.upgrades[31]).querySelector(".pp_desc").innerHTML =
        pp_upgrade.upgrades[31].desc
    pp_upgrade.upgrades[33].desc =
        "经验通量增长速度变为" +
        format_num(5) +
        "倍，且上限变为" +
        format_num(5) +
        "倍"
    pp_map.get(pp_upgrade.upgrades[33]).querySelector(".pp_desc").innerHTML =
        pp_upgrade.upgrades[33].desc
    pp_upgrade.upgrades[36].desc =
        "经验电池的效果变为" + format_num(9) + "倍"
    pp_map.get(pp_upgrade.upgrades[36]).querySelector(".pp_desc").innerHTML =
        pp_upgrade.upgrades[36].desc

    if (game.pp !== 0)
        pp_upgrade.upgrades[22].desc =
            "EXP production is boosted based on how much spare PP you have<br>(当前效果：" +
            format_eff(Math.log(game.pp / 100 + 1) ** 2 + 1) +
            "倍)"
    else
        pp_upgrade.upgrades[22].desc =
            "EXP production is boosted based on how much spare PP you have<br>(当前效果：" +
            format_num(1) +
            "倍)"
    pp_map.get(pp_upgrade.upgrades[22]).querySelector(".pp_desc").innerHTML =
        pp_upgrade.upgrades[22].desc

    generator_perk.perks[3].desc =
        "经验通量增长速度永久变为" +
        format_num(5) +
        "倍，且上限变为" +
        format_num(5) +
        "倍<br>(stacks with Magnified Flux if you have it, making it uncapped)"
    perk_map
        .get(generator_perk.perks[3])
        .querySelector(".perk_desc").innerHTML = generator_perk.perks[3].desc
    generator_perk.perks[4].desc =
        "每获得" +
        format_num(200) +
        "级，转生时就可以额外获得" +
        format_num(1) +
        "次转生次数<br>耐心升级还可以使获得的转生次数进一步增加，最高为" +
        format_num(50) +
        "倍"
    perk_map
        .get(generator_perk.perks[4])
        .querySelector(".perk_desc").innerHTML = generator_perk.perks[4].desc
    generator_perk.perks[9].desc =
        "放电的效果变为" +
        format_num(2) +
        "倍<br>Discharge automation is also now unlocked with the EXP Capacitor instead of High Voltage I"
    perk_map
        .get(generator_perk.perks[9])
        .querySelector(".perk_desc").innerHTML = generator_perk.perks[9].desc
    generator_perk.perks[13].desc =
        "重启所需的空余转生点不再增长，重启时，转生点超过" +
        format_num(200000) +
        "越多，就可以获得越多瓦特"
    perk_map
        .get(generator_perk.perks[13])
        .querySelector(".perk_desc").innerHTML = generator_perk.perks[13].desc
    if (game.fastest_reboot > 600 * game.tickspeed) {
        generator_perk.perks[16].desc =
            "EXP production is boosted based on your fastest Reboot<br>(当前效果：" +
            format_eff(1) +
            "倍)"
    } else {
        generator_perk.perks[16].desc =
            "EXP production is boosted based on your fastest Reboot<br>(当前效果：" +
            format_eff(
                Math.log(game.fastest_reboot / (600 * game.tickspeed)) /
                    Math.log(0.75) +
                    1
            ) +
            "倍)"
    }
    perk_map
        .get(generator_perk.perks[16])
        .querySelector(".perk_desc").innerHTML = generator_perk.perks[16].desc
    if (game.watts >= 117965)
        generator_perk.perks[24].desc =
            "Helium production is boosted based on how many watts you have<br>(当前效果：" +
            format_eff(
                (game.watts * 5) / generator_perk.perks[24].requirement
            ) +
            "倍)"
    else
        generator_perk.perks[24].desc =
            "Helium production is boosted based on how many watts you have<br>(当前效果：" +
            format_eff(1) +
            "倍)"
    perk_map
        .get(generator_perk.perks[24])
        .querySelector(".perk_desc").innerHTML = generator_perk.perks[24].desc
    let he_boost = 1
    if (game.helium > 10) {
        if (!game.qu_bought[6]) he_boost = Math.log10(game.helium)
        else he_boost = game.helium ** 0.08
    }
    generator_perk.perks[25].desc =
        "Helium production is boosted based on how much helium you have<br>(当前效果：" +
        format_eff(he_boost) +
        "倍)"
    perk_map
        .get(generator_perk.perks[25])
        .querySelector(".perk_desc").innerHTML = generator_perk.perks[25].desc
    generator_perk.perks[26].desc =
        "氘供能改为每阶层使氢产量变为" +
        format_eff(2.5) +
        "倍<br>(This applies retroactively)"
    perk_map
        .get(generator_perk.perks[26])
        .querySelector(".perk_desc").innerHTML = generator_perk.perks[26].desc

    if (game.hydrogen >= 1)
        quantum_upgrade.upgrades[0].desc =
            "Helium production is boosted based on unspent hydrogen<br>(当前效果：" +
            format_eff(game.hydrogen ** 0.25) +
            "倍)"
    else
        quantum_upgrade.upgrades[0].desc =
            "Helium production is boosted based on unspent hydrogen<br>(当前效果：" +
            format_eff(1) +
            "倍)"
    quantum_map
        .get(quantum_upgrade.upgrades[0])
        .querySelector(".qu_desc").innerHTML = quantum_upgrade.upgrades[0].desc

    quantum_upgrade.upgrades[3].desc =
        "EXP production is boosted based on your fastest Quantum Iteration<br>(当前效果：" +
        format_eff(
            5 **
                (Math.log(game.fastest_quantize / (6400 * game.tickspeed)) /
                    Math.log(0.5) +
                    1) +
                1
        ) +
        "倍)"
    quantum_map
        .get(quantum_upgrade.upgrades[3])
        .querySelector(".qu_desc").innerHTML = quantum_upgrade.upgrades[3].desc

    if (game.photons.cmp(0) === 1) {
        if (
            Decimal.ln(
                game.photons
                    .mul(Math.exp(12 ** 0.2))
                    .div(dark_upgrade.upgrades[1].price)
            ) **
                5 +
                1 >=
            1
        )
            dark_upgrade.upgrades[1].desc =
                "EXP production is boosted based on unspent photons<br>(当前效果：" +
                format_eff(
                    Decimal.ln(
                        game.photons
                            .mul(Math.exp(12 ** 0.2))
                            .div(dark_upgrade.upgrades[1].price)
                    ) **
                        5 +
                        1
                ) +
                "倍)"
        else
            dark_upgrade.upgrades[1].desc =
                "EXP production is boosted based on unspent photons<br>(当前效果：" +
                format_eff(1) +
                "倍)"
    } else
        dark_upgrade.upgrades[1].desc =
            "EXP production is boosted based on unspent photons<br>(当前效果：" +
            format_eff(1) +
            "倍)"
    quantum_map
        .get(dark_upgrade.upgrades[1])
        .querySelector(".dk_desc").innerHTML = dark_upgrade.upgrades[1].desc

    dark_upgrade.upgrades[3].desc =
        "挑战的完成次数上限变为" +
        format_num(20) +
        "次<br>超过" +
        format_num(12) +
        "次以后，挑战还可以加成氦产量"
    quantum_map
        .get(dark_upgrade.upgrades[3])
        .querySelector(".dk_desc").innerHTML = dark_upgrade.upgrades[3].desc
    dark_upgrade.upgrades[4].desc =
        "Helium production is boosted based on Prism LVL<br>(当前效果：" +
        format_eff(
            (game.prism_level / 58 + 1) ** Math.log2(game.prism_level + 1)
        ) +
        "倍)"
    quantum_map
        .get(dark_upgrade.upgrades[4])
        .querySelector(".dk_desc").innerHTML = dark_upgrade.upgrades[4].desc
    dark_upgrade.upgrades[5].desc =
        "不再需要有" +
        format_num(98304) +
        "瓦特才能获得氢<br>氘供能改为每阶层使氦产量变为" +
        format_num(3) +
        "倍"
    quantum_map
        .get(dark_upgrade.upgrades[5])
        .querySelector(".dk_desc").innerHTML = dark_upgrade.upgrades[5].desc

    omega_upgrade.upgrades[2].desc =
        "Dark matter growth factor is boosted based on your Highest Omega LVL<br>(当前效果：" +
        format_eff(1.15 ** game.highest_omega_level) +
        "倍)"
    quantum_map
        .get(omega_upgrade.upgrades[2])
        .querySelector(".om_desc").innerHTML = omega_upgrade.upgrades[2].desc
    if (game.om_bought[6])
        omega_upgrade.upgrades[6].desc =
            "暗物质可以超过" +
            format_infinity(new Decimal(1.7976931348622053 * 10 ** 308)) +
            "千克<br>超过" +
            format_infinity(new Decimal(1.7976931348622053 * 10 ** 308)) +
            "千克后，增长系数将随着暗物质增长变得越来越低"
    else
        omega_upgrade.upgrades[6].desc =
            "You can gain more than ∞ kg dark matter<br>Growth Factor will be reduced the further past ∞ kg you go"
    quantum_map
        .get(omega_upgrade.upgrades[6])
        .querySelector(".om_desc").innerHTML = omega_upgrade.upgrades[6].desc

    if (game.challenge === 7) {
        pp_upgrade.upgrades[22].desc =
            "EXP production is boosted based on how much spare PP you have<br>(当前效果：" +
            format_eff(1) +
            "倍)"
        pp_map
            .get(pp_upgrade.upgrades[22])
            .querySelector(".pp_desc").innerHTML = pp_upgrade.upgrades[22].desc
        pp_upgrade.upgrades[27].desc =
            "EXP production is boosted based on how many times you have Prestiged<br>(当前效果：" +
            format_eff(1) +
            "倍)"
        pp_map
            .get(pp_upgrade.upgrades[27])
            .querySelector(".pp_desc").innerHTML = pp_upgrade.upgrades[27].desc
        pp_upgrade.upgrades[30].desc =
            "EXP production is boosted based on your highest level<br>(当前效果：" +
            format_eff(1) +
            "倍)"
        pp_map
            .get(pp_upgrade.upgrades[30])
            .querySelector(".pp_desc").innerHTML = pp_upgrade.upgrades[30].desc
        generator_perk.perks[16].desc =
            "EXP production is boosted based on your fastest Reboot<br>(当前效果：" +
            format_eff(1) +
            "倍)"
        perk_map
            .get(generator_perk.perks[16])
            .querySelector(".perk_desc").innerHTML =
            generator_perk.perks[16].desc
        quantum_upgrade.upgrades[3].desc =
            "EXP production is boosted based on your fastest Quantum Iteration<br>(当前效果：" +
            format_eff(1) +
            "倍)"
        quantum_map
            .get(quantum_upgrade.upgrades[3])
            .querySelector(".qu_desc").innerHTML =
            quantum_upgrade.upgrades[3].desc
        dark_upgrade.upgrades[1].desc =
            "EXP production is boosted based on unspent photons<br>(当前效果：" +
            format_eff(1) +
            "倍)"
        quantum_map
            .get(dark_upgrade.upgrades[1])
            .querySelector(".dk_desc").innerHTML = dark_upgrade.upgrades[1].desc
    }

    achievement.achievements[0].requirement = "达到" + format_lvl(2) + "级"
    achievement.achievements[1].requirement = "达到" + format_lvl(10) + "级"
    achievement.achievements[2].requirement = "达到" + format_lvl(30) + "级"
    achievement.achievements[3].requirement = "达到" + format_lvl(60) + "级"
    achievement.achievements[4].requirement = "达到" + format_lvl(100) + "级"
    achievement.achievements[5].requirement = "达到" + format_lvl(200) + "级"
    achievement.achievements[6].requirement = "达到" + format_lvl(300) + "级"
    achievement.achievements[7].requirement = "达到" + format_lvl(500) + "级"
    achievement.achievements[8].requirement = "达到" + format_lvl(1000) + "级"
    achievement.achievements[9].requirement = "达到" + format_lvl(2000) + "级"
    achievement.achievements[10].requirement = "达到" + format_lvl(3000) + "级"
    achievement.achievements[11].requirement = "达到" + format_lvl(6000) + "级"
    achievement.achievements[12].requirement = "达到" + format_lvl(12000) + "级"
    achievement.achievements[13].requirement = "达到" + format_lvl(18000) + "级"
    achievement.achievements[14].requirement = "达到" + format_lvl(24000) + "级"
    achievement.achievements[15].requirement = "达到" + format_lvl(30000) + "级"
    achievement.achievements[16].requirement = "达到" + format_lvl(40000) + "级"
    achievement.achievements[17].requirement = "达到" + format_lvl(50000) + "级"
    achievement.achievements[18].requirement = "达到" + format_lvl(60000) + "级"
    achievement.achievements[19].requirement = "达到" + format_lvl(80000) + "级"
    achievement.achievements[20].requirement = "达到" + format_lvl(100000) + "级"
    achievement.achievements[21].requirement = "达到" + format_lvl(150000) + "级"
    achievement.achievements[22].requirement = "达到" + format_lvl(200000) + "级"
    achievement.achievements[23].requirement = "达到" + format_lvl(300000) + "级"
    achievement.achievements[24].requirement = "达到" + format_lvl(500000) + "级"
    achievement.achievements[25].requirement = "达到" + format_lvl(750000) + "级"
    achievement.achievements[26].requirement =
        "达到" + format_lvl(1000000) + "级"
    achievement.achievements[27].requirement =
        "达到" + format_lvl(1250000) + "级"
    achievement.achievements[28].requirement =
        "达到" + format_lvl(1500000) + "级"
    achievement.achievements[30].requirement =
        "进行" + format_num(10) + "次转生"
    achievement.achievements[31].requirement =
        "进行" + format_num(100) + "次转生"
    achievement.achievements[32].requirement =
        "进行" + format_num(1000) + "次转生"
    achievement.achievements[33].requirement =
        "进行" + format_num(10000) + "次转生"
    achievement.achievements[34].requirement =
        "进行" + format_num(100000) + "次转生"
    achievement.achievements[35].requirement =
        "进行" + format_num(1000000) + "次转生"
    achievement.achievements[36].requirement =
        "总经验值达到" + format_num(10 ** 6) + ""
    achievement.achievements[37].requirement =
        "总经验值达到" + format_num(10 ** 9) + ""
    achievement.achievements[38].requirement =
        "总经验值达到" + format_num(10 ** 12) + ""
    achievement.achievements[39].requirement =
        "总经验值达到" + format_num(10 ** 15) + ""
    achievement.achievements[40].requirement =
        "总经验值达到" + format_num(10 ** 18) + ""
    achievement.achievements[41].requirement =
        "总经验值达到" + format_num(10 ** 21) + ""
    achievement.achievements[42].requirement =
        "总经验值达到" + format_num(10 ** 24) + ""
    achievement.achievements[43].requirement =
        "总经验值达到" + format_num(10 ** 27) + ""
    achievement.achievements[44].requirement =
        "总经验值达到" + format_num(10 ** 30) + ""
    achievement.achievements[45].requirement =
        "总经验值达到" + format_num(10 ** 33) + ""
    achievement.achievements[46].requirement =
        "总经验值达到" + format_num(10 ** 39) + ""
    achievement.achievements[47].requirement =
        "总经验值达到" + format_num(10 ** 45) + ""
    achievement.achievements[48].requirement =
        "总经验值达到" + format_num(10 ** 51) + ""
    achievement.achievements[49].requirement =
        "总经验值达到" + format_num(10 ** 57) + ""
    achievement.achievements[50].requirement =
        "总经验值达到" + format_num(10 ** 63) + ""
    achievement.achievements[51].requirement =
        "总经验值达到" + format_num(10 ** 78) + ""
    achievement.achievements[52].requirement =
        "总经验值达到" + format_num(10 ** 93) + ""
    achievement.achievements[53].requirement =
        "总经验值达到" + format_num(10 ** 108) + ""
    achievement.achievements[54].requirement =
        "总经验值达到" + format_num(10 ** 123) + ""
    achievement.achievements[55].requirement =
        "总经验值达到" + format_num(10 ** 138) + ""
    achievement.achievements[56].requirement =
        "总经验值达到" + format_num(10 ** 153) + ""
    achievement.achievements[57].requirement =
        "总经验值达到" + format_num(10 ** 183) + ""
    achievement.achievements[58].requirement =
        "总经验值达到" + format_num(10 ** 213) + ""
    achievement.achievements[59].requirement =
        "总经验值达到" + format_num(10 ** 243) + ""
    achievement.achievements[60].requirement =
        "总经验值达到" + format_num(10 ** 273) + ""
    achievement.achievements[61].requirement =
        "总经验值达到" + format_num(10 ** 303) + ""
    achievement.achievements[62].requirement =
        "总经验值达到" + format_infinity(Decimal.pow(10, 333)) + ""
    achievement.achievements[63].requirement =
        "总经验值达到" + format_infinity(Decimal.pow(10, 363)) + ""
    achievement.achievements[64].requirement =
        "总经验值达到" + format_infinity(Decimal.pow(10, 393)) + ""
    achievement.achievements[70].requirement = "放大倍率达到" + format_num(100) + ""
    achievement.achievements[71].requirement =
        "放大倍率达到" + format_num(10000) + ""
    achievement.achievements[72].requirement =
        "放大倍率达到" + format_num(10 ** 6) + ""
    achievement.achievements[73].requirement =
        "放大倍率达到" + format_num(10 ** 8) + ""
    achievement.achievements[74].requirement =
        "放大倍率达到" + format_num(10 ** 10) + ""
    achievement.achievements[75].requirement =
        "放大倍率达到" + format_num(10 ** 12) + ""
    achievement.achievements[76].requirement =
        "放大倍率达到" + format_num(10 ** 14) + ""
    achievement.achievements[77].requirement =
        "放大倍率达到" + format_num(10 ** 16) + ""
    achievement.achievements[78].requirement =
        "放大倍率达到" + format_num(10 ** 18) + ""
    achievement.achievements[79].requirement =
        "放大倍率达到" + format_num(10 ** 20) + ""
    achievement.achievements[80].requirement =
        "放大倍率达到" + format_num(10 ** 24) + ""
    achievement.achievements[81].requirement =
        "放大倍率达到" + format_num(10 ** 28) + ""
    achievement.achievements[82].requirement =
        "放大倍率达到" + format_num(10 ** 32) + ""
    achievement.achievements[91].requirement =
        "购买所有" + format_num(39) + "个转生升级"
    achievement.achievements[92].requirement =
        "经验通量加成达到" + format_num(100) + "倍"
    achievement.achievements[93].requirement =
        "自动点击达到每秒点击" + format_num(30) + "次"
    achievement.achievements[94].requirement =
        "自动点击达到每秒点击" + format_num(600) + "次"
    achievement.achievements[95].requirement =
        "自动点击达到每秒点击" + format_num(10000) + "次"
    achievement.achievements[96].requirement =
        "手动点击" + format_num(10000) + "次"
    achievement.achievements[97].requirement =
        "在使用毒瘤记数法的前提下，进行" + format_num(1000) + "次转生"
    achievement.achievements[101].requirement =
        "进行" + format_num(3) + "次重启"
    achievement.achievements[102].requirement =
        "进行" + format_num(5) + "次重启"
    achievement.achievements[103].requirement =
        "进行" + format_num(10) + "次重启"
    achievement.achievements[104].requirement =
        "进行" + format_num(25) + "次重启"
    achievement.achievements[105].requirement =
        "进行" + format_num(50) + "次重启"
    achievement.achievements[106].requirement =
        "进行" + format_num(100) + "次重启"
    achievement.achievements[107].requirement =
        "进行" + format_num(1000) + "次重启"
    achievement.achievements[121].requirement =
        "单个挑战完成" + format_num(12) + "次"
    achievement.achievements[122].requirement =
        "单个挑战完成" + format_num(20) + "次"
    achievement.achievements[123].requirement =
        "挑战完成次数之和达到" + format_num(27) + "次"
    achievement.achievements[124].requirement =
        "挑战完成次数之和达到" + format_num(54) + "次"
    achievement.achievements[125].requirement =
        "挑战完成次数之和达到" + format_num(108) + "次"
    achievement.achievements[126].requirement =
        "挑战完成次数之和达到" + format_num(180) + "次"
    achievement.achievements[128].requirement =
        "解锁所有" + format_num(29) + "个发电机特权"
    achievement.achievements[131].requirement =
        "氦产量达到每秒" + format_num(10 ** 30) + "毫克"
    achievement.achievements[132].requirement =
        "氦产量达到每秒" + format_num(10 ** 60) + "毫克"
    achievement.achievements[133].requirement =
        "氦产量达到每秒" + format_num(10 ** 90) + "毫克"
    achievement.achievements[134].requirement =
        "氦产量达到每秒" + format_num(10 ** 120) + "毫克"
    achievement.achievements[135].requirement =
        "在某个反应堆核心正好升级" +
        format_num(100000) +
        "次后，手动升级它"
    achievement.achievements[139].requirement =
        "进行" + format_num(3) + "次量子化"
    achievement.achievements[140].requirement =
        "进行" + format_num(5) + "次量子化"
    achievement.achievements[141].requirement =
        "进行" + format_num(10) + "次量子化"
    achievement.achievements[142].requirement =
        "进行" + format_num(25) + "次量子化"
    achievement.achievements[143].requirement =
        "进行" + format_num(50) + "次量子化"
    achievement.achievements[144].requirement =
        "进行" + format_num(100) + "次量子化"
    achievement.achievements[145].requirement =
        "进行" + format_num(1000) + "次量子化"
    achievement.achievements[146].requirement =
        "棱镜达到" + format_lvl(1) + "级"
    achievement.achievements[147].requirement =
        "棱镜达到" + format_lvl(10) + "级"
    achievement.achievements[148].requirement =
        "棱镜达到" + format_lvl(30) + "级"
    achievement.achievements[149].requirement =
        "棱镜达到" + format_lvl(100) + "级"
    achievement.achievements[150].requirement =
        "棱镜达到" + format_lvl(200) + "级"
    achievement.achievements[151].requirement =
        "棱镜达到" + format_lvl(300) + "级"
    achievement.achievements[152].requirement =
        "棱镜达到" + format_lvl(500) + "级"
    achievement.achievements[156].name = "" + format_num(874030) + "马赫"
    achievement.achievements[160].requirement = "达到∞千克暗物质"
    if (game.om_bought[6])
        achievement.achievements[160].requirement =
            "达到" +
            format_infinity(new Decimal(1.7976931348622053 * 10 ** 308)) +
            "千克暗物质"
    achievement.achievements[162].requirement =
        "达到" +
        format_infinity(new Decimal(10).pow(2000)) +
        "千克暗物质"
    achievement.achievements[163].name =
        "回到" + format_num(1) + "千克"
    achievement.achievements[163].requirement =
        "达到" + format_num(1) + "级欧米伽"
    achievement.achievements[164].requirement =
        "达到" + format_num(5) + "级欧米伽"
    achievement.achievements[165].requirement =
        "达到" + format_num(20) + "级欧米伽"
    achievement.achievements[167].requirement =
        "从欧米伽挑战中获得" + format_num(5) + "免费欧米伽"
    if (game.achievements[64])
        achievement.achievements[170].requirement =
            "Click on this achievement's box"
    else
        achievement.achievements[170].requirement =
            "Ask nicely for this achievement"
    achievement.achievements[173].requirement =
        "您每秒有" +
        format_num(77777) +
        "分之" +
        format_num(1) +
        "的概率获得该成就"

    challenge.challenges[1].desc =
        "所有升级需要" + format_num(5) + "倍等级才可升级"
    challenge_map
        .get(challenge.challenges[1])
        .querySelector(".challenge_desc").innerHTML =
        challenge.challenges[1].desc
    challenge.challenges[4].desc =
        "经验值产量在" + format_num(30) + "秒内降为0"
    challenge_map
        .get(challenge.challenges[4])
        .querySelector(".challenge_desc").innerHTML =
        challenge.challenges[4].desc
    challenge_map
        .get(challenge.challenges[8])
        .querySelector(".challenge_desc").innerHTML =
        challenge.challenges[8].desc

    document.getElementById("challenge_footer").innerHTML =
        "完成所有" +
        format_num(108) +
        "次挑战后可以解锁新一层重置……"
    document.getElementById("quantize_req").innerHTML =
        "需要完成" +format_num(108) +
        "次挑战并达到" +
        format_lvl(65536) +
        "级"

    switch (game.notation) {
        case 0:
            achievement.achievements[50].name =
                "Why are you still using Long notation?"
            break
        case 1:
            achievement.achievements[50].name =
                "Why are you still using Standard notation?"
            break
        case 2:
        case 3:
            achievement.achievements[50].name = "64 digits is a lot"
            break
        case 4:
            achievement.achievements[50].name =
                "Why are you still using Condensed notation?"
            break
        case 5:
            achievement.achievements[50].name = "64 digits is a lot"
            break
        case 6:
            achievement.achievements[50].name =
                "This achievement brought to you by the letter T"
            break
        case 7:
            achievement.achievements[50].name = "Cancerously huge"
            break
        case 8:
            achievement.achievements[50].name = "Can't even see how big this is"
            break
        case 9:
            achievement.achievements[50].name = "A non-zero portion of infinity"
            break
        case 10:
            achievement.achievements[50].name = "This was huge in Rome"
            break
        case 11:
            achievement.achievements[50].name =
                "cvDCEpCCXNTZp5NqduZhBtFve0000000000"
            break
        case 12:
        case 13:
            achievement.achievements[50].name = "64 digits is a lot"
            break
    }

    if (game.notation === 8) {
        pp_upgrade.upgrades[14].desc =
            "Unlocks the EXP Overclocker, which boosts EXP ???x for ???"
        pp_map
            .get(pp_upgrade.upgrades[14])
            .querySelector(".pp_desc").innerHTML = pp_upgrade.upgrades[14].desc
        pp_upgrade.upgrades[24].desc =
            "The autoclicker is a further +??? faster for every other upgrade tier<br>(当前效果：" +
            format_eff(
                6 +
                    (game.boost_tier +
                        game.fluct_tier +
                        game.fact_tier +
                        game.flux_tier +
                        game.battery_tier) *
                        0.0025
            ) +
            "倍)"
        pp_map
            .get(pp_upgrade.upgrades[24])
            .querySelector(".pp_desc").innerHTML = pp_upgrade.upgrades[24].desc
        pp_upgrade.upgrades[29].desc =
            "Longer Prestiges give more AMP (up to ???)"
        pp_map
            .get(pp_upgrade.upgrades[29])
            .querySelector(".pp_desc").innerHTML = pp_upgrade.upgrades[29].desc
        pp_upgrade.upgrades[37].desc =
            "Unlocks ??? Capacitance mode, giving a ???x boost on Discharge"
        pp_map
            .get(pp_upgrade.upgrades[37])
            .querySelector(".pp_desc").innerHTML = pp_upgrade.upgrades[37].desc
        pp_upgrade.upgrades[38].desc =
            "Unlocks ??? Capacitance mode, giving a ???x boost on Discharge<br>Also allows you to Discharge at ???"
        pp_map
            .get(pp_upgrade.upgrades[38])
            .querySelector(".pp_desc").innerHTML = pp_upgrade.upgrades[38].desc

        generator_perk.perks[0].desc =
            "EXP production is boosted +??? for every achievement completed<br>Also unlocks Peak mode for Advanced auto-Prestige, automatically prestiging at peak AMP/sec"
        perk_map
            .get(generator_perk.perks[0])
            .querySelector(".perk_desc").innerHTML =
            generator_perk.perks[0].desc
        generator_perk.perks[18].desc =
            "You permanently keep ??? of your Times Prestiged stat every Reboot"
        perk_map
            .get(generator_perk.perks[18])
            .querySelector(".perk_desc").innerHTML =
            generator_perk.perks[18].desc
        generator_perk.perks[27].desc =
            "You gain ??? of your pending AMP every second"
        perk_map
            .get(generator_perk.perks[27])
            .querySelector(".perk_desc").innerHTML =
            generator_perk.perks[27].desc
        generator_perk.perks[28].desc =
            "PP is immediately granted on leveling up rather than Prestiging<br>AMP Conversion now gives ??? of your pending AMP instead"
        perk_map
            .get(generator_perk.perks[28])
            .querySelector(".perk_desc").innerHTML =
            generator_perk.perks[28].desc

        achievement.achievements[29].requirement = "Prestige ??? times"
        achievement.achievements[65].requirement = "Play for ???"
        achievement.achievements[66].requirement = "Play for ???"
        achievement.achievements[67].requirement = "Play for ???"
        achievement.achievements[68].requirement = "Play for ???"
        achievement.achievements[69].requirement = "Play for ???"
        achievement.achievements[108].requirement = "Reboot in under ???"
        achievement.achievements[109].requirement = "Reboot in under ???"
        achievement.achievements[110].requirement = "Reboot in under ???"
        achievement.achievements[111].requirement = "Reboot in under ???"
        achievement.achievements[138].requirement = "Quantize ??? times"
        achievement.achievements[153].requirement = "Quantize in under ???"
        achievement.achievements[154].requirement = "Quantize in under ???"
        achievement.achievements[155].requirement = "Quantize in under ???"
        achievement.achievements[156].requirement = "Quantize in under ???"
        achievement.achievements[157].requirement = "Quantize in under ???"
        if (!game.om_bought[6])
            achievement.achievements[160].requirement =
                "Reach ??? kg dark matter"
        achievement.achievements[161].requirement =
            "Reach ??? kg dark matter in under ???"
        achievement.achievements[171].requirement = "Gain no EXP for ???"
        if (game.perks[9]) {
            pp_upgrade.upgrades[35].desc =
                "Unlocks ??? Capacitance mode, which gives a ???x boost on Discharge"
            pp_map
                .get(pp_upgrade.upgrades[35])
                .querySelector(".pp_desc").innerHTML =
                pp_upgrade.upgrades[35].desc
        } else {
            pp_upgrade.upgrades[35].desc =
                "Unlocks ??? Capacitance mode, which gives a ???x boost on Discharge<br>Also unlocks automation for Discharge"
            pp_map
                .get(pp_upgrade.upgrades[35])
                .querySelector(".pp_desc").innerHTML =
                pp_upgrade.upgrades[35].desc
        }

        if (game.perks[17]) {
            generator_perk.perks[6].desc =
                "All Upgrades require ??? fewer levels<br>(Does not apply to challenges)"
            perk_map
                .get(generator_perk.perks[6])
                .querySelector(".perk_desc").innerHTML =
                generator_perk.perks[6].desc
            generator_perk.perks[21].desc =
                "All Upgrades require ??? fewer levels<br>(Does not apply to challenges)"
            perk_map
                .get(generator_perk.perks[21])
                .querySelector(".perk_desc").innerHTML =
                generator_perk.perks[21].desc
        } else {
            generator_perk.perks[6].desc =
                "All Upgrades require ??? fewer levels"
            perk_map
                .get(generator_perk.perks[6])
                .querySelector(".perk_desc").innerHTML =
                generator_perk.perks[6].desc
            generator_perk.perks[21].desc =
                "All Upgrades require ??? fewer levels"
            perk_map
                .get(generator_perk.perks[21])
                .querySelector(".perk_desc").innerHTML =
                generator_perk.perks[21].desc
        }
    } else {
        pp_upgrade.upgrades[14].desc =
            "Unlocks the EXP Overclocker, which boosts EXP 3x for 45 seconds"
        pp_map
            .get(pp_upgrade.upgrades[14])
            .querySelector(".pp_desc").innerHTML = pp_upgrade.upgrades[14].desc
        pp_upgrade.upgrades[24].desc =
            "The autoclicker is a further +0.25% faster for every other upgrade tier<br>(当前效果：" +
            format_eff(
                6 +
                    (game.boost_tier +
                        game.fluct_tier +
                        game.fact_tier +
                        game.flux_tier +
                        game.battery_tier) *
                        0.0025
            ) +
            "倍)"
        pp_map
            .get(pp_upgrade.upgrades[24])
            .querySelector(".pp_desc").innerHTML = pp_upgrade.upgrades[24].desc
        if (game.challenge === 7) {
            pp_upgrade.upgrades[24].desc =
                "The autoclicker is a further +0.25% faster for every other upgrade tier<br>(当前效果：" +
                format_eff(1) +
                "倍)"
            pp_map
                .get(pp_upgrade.upgrades[24])
                .querySelector(".pp_desc").innerHTML =
                pp_upgrade.upgrades[24].desc
        }
        pp_upgrade.upgrades[29].desc =
            "Longer Prestiges give more AMP (up to 10 seconds)"
        pp_map
            .get(pp_upgrade.upgrades[29])
            .querySelector(".pp_desc").innerHTML = pp_upgrade.upgrades[29].desc

        generator_perk.perks[0].desc =
            "EXP production is boosted +5% for every achievement completed<br>Also unlocks Peak mode for Advanced auto-Prestige, automatically prestiging at peak AMP/sec"
        perk_map
            .get(generator_perk.perks[0])
            .querySelector(".perk_desc").innerHTML =
            generator_perk.perks[0].desc
        generator_perk.perks[18].desc =
            "You permanently keep 25% of your Times Prestiged stat every Reboot"
        perk_map
            .get(generator_perk.perks[18])
            .querySelector(".perk_desc").innerHTML =
            generator_perk.perks[18].desc
        generator_perk.perks[27].desc =
            "You gain 20% of your pending AMP every second"
        perk_map
            .get(generator_perk.perks[27])
            .querySelector(".perk_desc").innerHTML =
            generator_perk.perks[27].desc
        generator_perk.perks[28].desc =
            "PP is immediately granted on leveling up rather than Prestiging<br>AMP Conversion now gives 100% of your pending AMP instead"
        perk_map
            .get(generator_perk.perks[28])
            .querySelector(".perk_desc").innerHTML =
            generator_perk.perks[28].desc

        achievement.achievements[29].requirement = "Prestige 1 time"
        achievement.achievements[65].requirement = "Play for 1 hour"
        achievement.achievements[66].requirement = "Play for 6 hours"
        achievement.achievements[67].requirement = "Play for 24 hours"
        achievement.achievements[68].requirement = "Play for 72 hours"
        achievement.achievements[69].requirement = "Play for 168 hours"
        achievement.achievements[108].requirement = "Reboot in under 1 hour"
        achievement.achievements[109].requirement = "Reboot in under 10 minutes"
        achievement.achievements[110].requirement = "Reboot in under 1 minute"
        achievement.achievements[111].requirement = "Reboot in under 1 second"
        achievement.achievements[138].requirement = "Quantize 1 time"
        achievement.achievements[153].requirement = "Quantize in under 1 hour"
        achievement.achievements[154].requirement =
            "Quantize in under 5 minutes"
        achievement.achievements[155].requirement = "Quantize in under 1 minute"
        achievement.achievements[156].requirement =
            "Quantize in under 30 seconds"
        achievement.achievements[157].requirement =
            "Quantize in under 10 seconds"
        achievement.achievements[161].requirement =
            "Reach ∞ kg dark matter in under 1 minute"
        if (game.om_bought[6])
            achievement.achievements[161].requirement =
                "在花费时间少于1分钟的前提下达到" +
                format_infinity(new Decimal(1.7976931348622053 * 10 ** 308)) +
                "千克暗物质"
        achievement.achievements[171].requirement = "Gain no EXP for 10 minutes"

        if (game.perks[9]) {
            pp_upgrade.upgrades[35].desc =
                "Unlocks 50% Capacitance mode, and Discharge now has a 8x boost"
            pp_map
                .get(pp_upgrade.upgrades[35])
                .querySelector(".pp_desc").innerHTML =
                pp_upgrade.upgrades[35].desc
            pp_upgrade.upgrades[37].desc =
                "Unlocks 75% Capacitance mode, and Discharge now has a 12x boost"
            pp_map
                .get(pp_upgrade.upgrades[37])
                .querySelector(".pp_desc").innerHTML =
                pp_upgrade.upgrades[37].desc
            pp_upgrade.upgrades[38].desc =
                "Unlocks 100% Capacitance mode, and Discharge now has a 16x boost<br>Also allows you to Discharge at 0 seconds"
            pp_map
                .get(pp_upgrade.upgrades[38])
                .querySelector(".pp_desc").innerHTML =
                pp_upgrade.upgrades[38].desc
        } else {
            pp_upgrade.upgrades[35].desc =
                "Unlocks 50% Capacitance mode, and Discharge now has a 4x boost<br>Also unlocks automation for Discharge"
            pp_map
                .get(pp_upgrade.upgrades[35])
                .querySelector(".pp_desc").innerHTML =
                pp_upgrade.upgrades[35].desc
            pp_upgrade.upgrades[37].desc =
                "Unlocks 75% Capacitance mode, and Discharge now has a 6x boost"
            pp_map
                .get(pp_upgrade.upgrades[37])
                .querySelector(".pp_desc").innerHTML =
                pp_upgrade.upgrades[37].desc
            pp_upgrade.upgrades[38].desc =
                "Unlocks 100% Capacitance mode, and Discharge now has a 8x boost<br>Also allows you to Discharge at 0 seconds"
            pp_map
                .get(pp_upgrade.upgrades[38])
                .querySelector(".pp_desc").innerHTML =
                pp_upgrade.upgrades[38].desc
        }

        if (game.perks[17]) {
            generator_perk.perks[6].desc =
                "All Upgrades require 25% fewer levels<br>(Does not apply to challenges)"
            perk_map
                .get(generator_perk.perks[6])
                .querySelector(".perk_desc").innerHTML =
                generator_perk.perks[6].desc
            generator_perk.perks[21].desc =
                "All Upgrades require 50% fewer levels<br>(Does not apply to challenges)"
            perk_map
                .get(generator_perk.perks[21])
                .querySelector(".perk_desc").innerHTML =
                generator_perk.perks[21].desc
        } else {
            generator_perk.perks[6].desc =
                "All Upgrades require 25% fewer levels"
            perk_map
                .get(generator_perk.perks[6])
                .querySelector(".perk_desc").innerHTML =
                generator_perk.perks[6].desc
            generator_perk.perks[21].desc =
                "All Upgrades require 50% fewer levels"
            perk_map
                .get(generator_perk.perks[21])
                .querySelector(".perk_desc").innerHTML =
                generator_perk.perks[21].desc
        }
    }

    if (game.perks[0]) {
        pp_upgrade.upgrades[12].desc =
            "Unlocks four additional modes for Auto-Prestige configuration"
        pp_map
            .get(pp_upgrade.upgrades[12])
            .querySelector(".pp_desc").innerHTML = pp_upgrade.upgrades[12].desc
    } else {
        pp_upgrade.upgrades[12].desc =
            "Unlocks three additional modes for Auto-Prestige configuration"
        pp_map
            .get(pp_upgrade.upgrades[12])
            .querySelector(".pp_desc").innerHTML = pp_upgrade.upgrades[12].desc
    }

    if (game.perks[8]) {
        pp_upgrade.upgrades[25].desc =
            "Unlocks an upgrade that gives an additional boost to autoclicker speed" +
            '<br><span class="small_text">FUSION: always at 100% charge</span>'
        pp_map
            .get(pp_upgrade.upgrades[25])
            .querySelector(".pp_desc").innerHTML = pp_upgrade.upgrades[25].desc
    } else {
        pp_upgrade.upgrades[25].desc =
            "Unlocks an upgrade that gives an additional boost to autoclicker speed with active and idle modes" +
            '<br><span class="small_text">ACTIVE mode: stays at 100% charge for the first 10 seconds, then decreases to 0% charge by 30 seconds' +
            "<br>IDLE mode: starts at 0% charge, and reaches 100% charge after 5 minutes</span>"
        pp_map
            .get(pp_upgrade.upgrades[25])
            .querySelector(".pp_desc").innerHTML = pp_upgrade.upgrades[25].desc
    }

    if (game.perks[9]) {
        pp_upgrade.upgrades[32].desc =
            "Unlocks the EXP Capacitor, which takes some of your EXP production and stores it<br>可以将储存的经验值进行放电并获得相应数值" +
            format_num(4) +
            "倍的经验值<br>Also starts with automation unlocked"
        pp_map
            .get(pp_upgrade.upgrades[32])
            .querySelector(".pp_desc").innerHTML = pp_upgrade.upgrades[32].desc
    } else {
        pp_upgrade.upgrades[32].desc =
            "Unlocks the EXP Capacitor, which takes some of your EXP production and stores it<br>可以将储存的经验值进行放电并获得相应数值" +
            format_num(2) +
            "倍的经验值"
        pp_map
            .get(pp_upgrade.upgrades[32])
            .querySelector(".pp_desc").innerHTML = pp_upgrade.upgrades[32].desc
    }

    if (game.perks[12]) {
        pp_upgrade.upgrades[9].desc =
            "使升级面板的每个升级免费+" +
            format_num(8) +
            "阶层"
        pp_map.get(pp_upgrade.upgrades[9]).querySelector(".pp_desc").innerHTML =
            pp_upgrade.upgrades[9].desc
        pp_upgrade.upgrades[18].desc =
            "使升级面板的每个升级免费+" +
            format_num(12) +
            "阶层"
        pp_map
            .get(pp_upgrade.upgrades[18])
            .querySelector(".pp_desc").innerHTML = pp_upgrade.upgrades[18].desc
        pp_upgrade.upgrades[28].desc =
            "使升级面板的每个升级免费+" +
            format_num(16) +
            "阶层"
        pp_map
            .get(pp_upgrade.upgrades[28])
            .querySelector(".pp_desc").innerHTML = pp_upgrade.upgrades[28].desc
        pp_upgrade.upgrades[34].desc =
            "使升级面板的每个升级免费+" +
            format_num(20) +
            "阶层"
        pp_map
            .get(pp_upgrade.upgrades[34])
            .querySelector(".pp_desc").innerHTML = pp_upgrade.upgrades[34].desc
        generator_perk.perks[1].desc =
            "使升级面板的每个升级免费+" +
            format_num(24) +
            "阶层"
        perk_map
            .get(generator_perk.perks[1])
            .querySelector(".perk_desc").innerHTML =
            generator_perk.perks[1].desc
    } else {
        pp_upgrade.upgrades[9].desc =
            "使升级面板的每个升级免费+" +
            format_num(4) +
            "阶层"
        pp_map.get(pp_upgrade.upgrades[9]).querySelector(".pp_desc").innerHTML =
            pp_upgrade.upgrades[9].desc
        pp_upgrade.upgrades[18].desc =
            "使升级面板的每个升级免费+" +
            format_num(6) +
            "阶层"
        pp_map
            .get(pp_upgrade.upgrades[18])
            .querySelector(".pp_desc").innerHTML = pp_upgrade.upgrades[18].desc
        pp_upgrade.upgrades[28].desc =
            "使升级面板的每个升级免费+" +
            format_num(8) +
            "阶层"
        pp_map
            .get(pp_upgrade.upgrades[28])
            .querySelector(".pp_desc").innerHTML = pp_upgrade.upgrades[28].desc
        pp_upgrade.upgrades[34].desc =
            "使升级面板的每个升级免费+" +
            format_num(10) +
            "阶层"
        pp_map
            .get(pp_upgrade.upgrades[34])
            .querySelector(".pp_desc").innerHTML = pp_upgrade.upgrades[34].desc
        generator_perk.perks[1].desc =
            "使升级面板的每个升级免费+" +
            format_num(12) +
            "阶层"
        perk_map
            .get(generator_perk.perks[1])
            .querySelector(".perk_desc").innerHTML =
            generator_perk.perks[1].desc
    }

    if (game.perks[17]) {
        generator_perk.perks[15].desc =
            "Unlocks automation for Reboot<br>(Does not apply to challenges)"
        perk_map
            .get(generator_perk.perks[15])
            .querySelector(".perk_desc").innerHTML =
            generator_perk.perks[15].desc
    } else {
        generator_perk.perks[15].desc = "Unlocks automation for Reboot"
        perk_map
            .get(generator_perk.perks[15])
            .querySelector(".perk_desc").innerHTML =
            generator_perk.perks[15].desc
    }

    if (game.perks[25]) {
        challenge.challenges[5].desc =
            "You can only Prestige once<br>Multi-Prestige, Reboot Residue, AMP Conversion, and PP Shift do not apply"
        challenge_map
            .get(challenge.challenges[5])
            .querySelector(".challenge_desc").innerHTML =
            challenge.challenges[5].desc
    } else if (game.perks[24]) {
        challenge.challenges[5].desc =
            "You can only Prestige once<br>Multi-Prestige, Reboot Residue, and AMP Conversion do not apply"
        challenge_map
            .get(challenge.challenges[5])
            .querySelector(".challenge_desc").innerHTML =
            challenge.challenges[5].desc
    } else {
        challenge.challenges[5].desc =
            "You can only Prestige once<br>Multi-Prestige and Reboot Residue do not apply"
        challenge_map
            .get(challenge.challenges[5])
            .querySelector(".challenge_desc").innerHTML =
            challenge.challenges[5].desc
    }
}

//make all gui match the loaded save data
function regenerate_ui() {
    color_update()
    reset_button_update()
    pp_update()
    challenge_update()
    reactor_update()
    goto_tab(game.tab)
    if (game.tab === 2) {
        goto_subtab(game.subtab[0])
    } else if (game.tab === 3) {
        goto_subtab(game.subtab[1])
    } else if (game.tab === 4) {
        goto_subtab(game.subtab[2])
    } else if (game.tab === 5) {
        goto_subtab(game.subtab[3])
    }
    if (game.work) {
        document.getElementById("work_button").innerHTML = "ENABLED"
    } else {
        document.getElementById("work_button").innerHTML = "DISABLED"
    }
    switch (game.notation) {
        case 0:
            document.getElementById("notation_button").innerHTML = "LONG"
            break
        case 1:
            document.getElementById("notation_button").innerHTML = "STANDARD"
            break
        case 2:
            document.getElementById("notation_button").innerHTML = "SCIENTIFIC"
            break
        case 3:
            document.getElementById("notation_button").innerHTML = "ENGINEERING"
            break
        case 4:
            document.getElementById("notation_button").innerHTML = "CONDENSED"
            break
        case 5:
            document.getElementById("notation_button").innerHTML = "LOGARITHM"
            break
        case 6:
            document.getElementById("notation_button").innerHTML = "LETTERS"
            break
        case 7:
            document.getElementById("notation_button").innerHTML = "CANCER"
            break
        case 8:
            document.getElementById("notation_button").innerHTML = "???"
            break
        case 9:
            document.getElementById("notation_button").innerHTML = "INFINITY"
            break
        case 10:
            document.getElementById("notation_button").innerHTML = "ROMAN"
            break
        case 11:
            document.getElementById("notation_button").innerHTML = "BASE64"
            break
        case 12:
            document.getElementById("notation_button").innerHTML =
                "MIXED SCIENTIFIC"
            break
        case 13:
            document.getElementById("notation_button").innerHTML =
                "MIXED ENGINEERING"
            break
    }
    switch (game.switchpoint) {
        case 0:
            document.getElementById("switchpoint_button").innerHTML = "MILLION"
            break
        case 1:
            document.getElementById("switchpoint_button").innerHTML = "BILLION"
            break
    }
    switch (game.range_mode) {
        case 0:
            document.getElementById("range_button").innerHTML = "RANGE"
            break
        case 1:
            document.getElementById("range_button").innerHTML = "AVERAGE"
            break
        case 2:
            document.getElementById("range_button").innerHTML = "VARIANCE"
            break
    }
    if (game.hotkeys) {
        document.getElementById("hotkeys_button").innerHTML = "ENABLED"
    } else {
        document.getElementById("hotkeys_button").innerHTML = "DISABLED"
    }
    switch (game.pp_hide) {
        case 0:
            document.getElementById("hidden_button").innerHTML = "SHOW ALL"
            break
        case 1:
            document.getElementById("hidden_button").innerHTML =
                "SHOW IMPORTANT"
            break
        case 2:
            document.getElementById("hidden_button").innerHTML = "HIDE BOUGHT"
            break
    }
    if (game.perks_hidden) {
        document.getElementById("perks_hidden_button").innerHTML = "ENABLED"
    } else {
        document.getElementById("perks_hidden_button").innerHTML = "DISABLED"
    }
    if (
        game.pp_progress &&
        (game.prestige >= 1 || game.reboot >= 1 || game.quantum >= 1)
    ) {
        document.getElementById("pp_bar_button").innerHTML = "ENABLED"
        document.getElementById("pp_back").style.display = "block"
    } else {
        document.getElementById("pp_bar_button").innerHTML = "DISABLED"
        document.getElementById("pp_back").style.display = "none"
    }
    if (game.epilepsy) {
        document.getElementById("epilepsy_button").innerHTML = "DISABLED"
        document.documentElement.style.setProperty(
            "--button_background",
            "white"
        )
        document.documentElement.style.setProperty("--button_color", "black")
        document.documentElement.style.setProperty("--enter_color", "white")
        document.documentElement.style.setProperty("--enter_shadow", "white")
    } else {
        document.getElementById("epilepsy_button").innerHTML = "ENABLED"
        document.documentElement.style.setProperty(
            "--button_background",
            "#780e74"
        )
        document.documentElement.style.setProperty("--button_color", "white")
        document.documentElement.style.setProperty("--enter_color", "#ff2929")
        document.documentElement.style.setProperty("--enter_shadow", "#ff0000")
    }
    switch (game.color_mode) {
        case 0:
            document.getElementById("color_button").innerHTML = "AUTOMATIC"
            break
        case 1:
            document.getElementById("color_button").innerHTML = "RAINBOW"
            break
        case 2:
            document.getElementById("color_button").innerHTML = "CUSTOM"
            document.getElementById("custom_hue_text").style.display = "block"
            document.getElementById("hue_input").style.display = "block"
            break
    }
    if (game.confirmation) {
        document.getElementById("confirm_button").innerHTML = "ENABLED"
    } else {
        document.getElementById("confirm_button").innerHTML = "DISABLED"
    }
    if (game.challenge_confirmation) {
        document.getElementById("ch_confirm_button").innerHTML = "ENABLED"
    } else {
        document.getElementById("ch_confirm_button").innerHTML = "DISABLED"
    }
    if (game.quantum_confirmation) {
        document.getElementById("qu_confirm_button").innerHTML = "ENABLED"
    } else {
        document.getElementById("qu_confirm_button").innerHTML = "DISABLED"
    }
    switch (game.priority_layer) {
        case 0:
            document.getElementById("layer_button").innerHTML = "NONE"
            break
        case 1:
            document.getElementById("layer_button").innerHTML = "PRESTIGE"
            break
        case 2:
            document.getElementById("layer_button").innerHTML = "REBOOT"
            break
        case 3:
            document.getElementById("layer_button").innerHTML = "QUANTUM"
            break
    }

    if (game.pp_bought[39] == true) {
        document.getElementById("reboot").style.display = "inline"
        watts_update()
    } else {
        document.getElementById("reboot").style.display = "none"
    }

    document.getElementById("lvlnum").innerHTML = format_num(game.level)
    document.getElementById("exp").innerHTML =
        format_infinity(game.exp) + "经验值，升级需" + format_infinity(game.goal) + "经验值"
    document.getElementById("total_exp").innerHTML =
        format_infinity(game.total_exp) + "总经验值"

    for (let i = 0; i < 6; i++) {
        up_toggle(i)
        up_toggle(i)
    }
    pr_toggle()
    pr_toggle()
    oc_toggle()
    oc_toggle()
    ds_toggle()
    ds_toggle()
    pp_toggle()
    pp_toggle()
    pp_switch(game.autopp_mode)
    cp_toggle()
    cp_toggle()
    battery_toggle()
    battery_toggle()
    max_toggle()
    max_toggle()
    if (game.level < 60) {
        document.getElementById("progress").style.width =
            game.exp.div(game.goal).mul(100).clamp(0, 100) + "%"
    } else {
        document.getElementById("progress").style.width = 100 + "%"
    }

    if (game.achiev_page === 0) {
        document.getElementById("page_left1").style.display = "none"
        document.getElementById("page_left2").style.display = "none"
    } else {
        document.getElementById("page_left1").style.display = "inline"
        document.getElementById("page_left2").style.display = "inline"
    }
    if (
        game.achiev_page === Math.ceil(achievement.achievements.length / 10 - 1)
    ) {
        document.getElementById("page_right1").style.display = "none"
        document.getElementById("page_right2").style.display = "none"
    }

    document.getElementById("page_text1").innerHTML =
        "第" + (game.achiev_page + 1) + "页"
    document.getElementById("page_text2").innerHTML =
        "第" + (game.achiev_page + 1) + "页"

    if (game.pp_bought[3]) {
        document.getElementById("amp_auto").style.display = "inline"
        document.getElementById("auto_config").style.display = "block"
        if (game.pp_bought[6]) {
            if (game.pp_bought[12]) {
                document.getElementById("auto_mode").style.display = "block"
                if (game.perks[0])
                    document.getElementById("peak_mode").style.display =
                        "inline"
                else document.getElementById("peak_mode").style.display = "none"
            }
            autopr_switch(game.autopr_mode)
        } else {
            document.getElementById("auto_level").style.display = "none"
        }
    } else {
        document.getElementById("amp_auto").style.display = "none"
        document.getElementById("auto_config").style.display = "none"
    }

    if (
        game.pp_bought[14] &&
        game.challenge !== 1 &&
        game.challenge !== 7 &&
        game.challenge !== 9
    ) {
        document.getElementById("overclock").style.display = "block"
        switch (game.oc_state) {
            case 0:
                document.getElementById("oc_button").style.display = "none"
                document.getElementById("oc_state").innerHTML = "Recharging"
                document.getElementById("oc_timer").style.display = "block"
                if (!meme)
                    document.getElementById("oc_progress").style.background =
                        "#ff2f00"
                break
            case 1:
                document.getElementById("oc_button").style.display = "inline"
                document.getElementById("oc_state").innerHTML = "Standby"
                document.getElementById("oc_timer").style.display = "none"
                if (!meme)
                    document.getElementById("oc_progress").style.background =
                        "#ff2f00"
                break
            case 2:
                document.getElementById("oc_button").style.display = "none"
                document.getElementById("oc_state").innerHTML =
                    "强化" + format_num(game.exp_oc) + "倍"
                document.getElementById("oc_timer").style.display = "block"
                if (!meme)
                    document.getElementById("oc_progress").style.background =
                        "#ff7f00"
                break
        }

        if (game.pp_bought[16]) {
            if (!game.perks[20])
                document.getElementById("oc_auto").style.display = "inline"
        } else {
            document.getElementById("oc_auto").style.display = "none"
        }
    } else {
        document.getElementById("overclock").style.display = "none"
    }

    if (
        (game.pp_bought[35] && !game.perks[9]) ||
        (game.pp_bought[32] && game.perks[9])
    ) {
        document.getElementById("dis_text").style.display = "block"
        document.getElementById("dis_input").style.display = "block"
    } else {
        document.getElementById("dis_text").style.display = "none"
        document.getElementById("dis_input").style.display = "none"
    }
    if (game.autods_goal === -1) document.getElementById("dis_input").value = ""
    else document.getElementById("dis_input").value = game.autods_goal

    if (
        game.pp_bought[32] &&
        game.challenge !== 1 &&
        game.challenge !== 7 &&
        game.challenge !== 9
    ) {
        document.getElementById("capacitor").style.display = "block"
        set_capacitance(game.cap_mode)
        if (game.perks[9]) {
            document.getElementById("dis_auto").style.display = "block"
        }
    } else {
        document.getElementById("capacitor").style.display = "none"
    }

    if (
        game.pp_bought[35] &&
        game.challenge !== 1 &&
        game.challenge !== 7 &&
        game.challenge !== 9
    ) {
        document.getElementById("cap_50").style.display = "inline"
        if (!game.perks[9]) {
            document.getElementById("dis_auto").style.display = "block"
        }
    } else {
        document.getElementById("cap_50").style.display = "none"
    }

    if (
        game.pp_bought[37] &&
        game.challenge !== 1 &&
        game.challenge !== 7 &&
        game.challenge !== 9
    ) {
        document.getElementById("cap_75").style.display = "inline"
    } else {
        document.getElementById("cap_75").style.display = "none"
    }

    if (
        game.pp_bought[38] &&
        game.challenge !== 1 &&
        game.challenge !== 7 &&
        game.challenge !== 9
    ) {
        document.getElementById("cap_100").style.display = "inline"
        document.getElementById("dis_input").min = 0
    } else {
        document.getElementById("cap_100").style.display = "none"
    }

    if (game.perks[7]) {
        document.getElementById("autopp_config").style.display = "block"

        for (const upgrade of pp_upgrade.upgrades) {
            if (upgrade.id !== 39) {
                let element = pp_map.get(upgrade)
                let text = element.querySelector(".pp_text")
                let priority = text.querySelector(".pp_priority")
                let input = priority.querySelector(".priority_input")
                input.value = game.priority[upgrade.id]
            }
        }
    } else {
        document.getElementById("autopp_config").style.display = "none"
    }

    if (game.perks[11])
        document.getElementById("cap_auto").style.display = "inline"
    else document.getElementById("cap_auto").style.display = "none"

    if (game.perks[14]) {
        document.getElementById("smart_config").style.display = "block"
        smart_load()
        smart_mode(game.smartpr_mode)
        smart_repeat()
        smart_repeat()
        smart_start()
        smart_start()
        smart_select(game.smartpr_select)
    } else {
        document.getElementById("smart_config").style.display = "none"
    }

    if (game.perks[15]) {
        if (game.challenge === 0)
            document.getElementById("autorb_block").style.display = "block"
        else document.getElementById("autorb_block").style.display = "none"
        if (!game.confirmation) {
            rb_toggle()
            rb_toggle()
        } else {
            game.autorb_toggle = false
        }
        document.getElementById("watts_input").value = game.autorb_goal[0]
        document.getElementById("time_input2").value = game.autorb_goal[1]
        document.getElementById("push_input").value = game.autorb_push
        pendingrb_toggle()
        pendingrb_toggle()
        autorb_switch(game.autorb_mode)
    } else {
        document.getElementById("autorb_block").style.display = "none"
    }

    if (game.qu_bought[4]) {
        document.getElementById("autohy_block").style.display = "block"
        hy_toggle()
        hy_toggle()
        document.getElementById("portion_input").value = game.autohy_portion
    } else {
        document.getElementById("autohy_block").style.display = "none"
    }

    if (game.qu_bought[7] && game.tab === 4) {
        document.getElementById("quantum_tabs").style.display = "flex"
    } else {
        document.getElementById("quantum_tabs").style.display = "none"
    }

    if (game.dk_bought[2]) {
        document.getElementById("autoqu_block").style.display = "block"
        if (!game.quantum_confirmation) {
            qu_toggle()
            qu_toggle()
        } else {
            game.autoqu_toggle = false
        }
        document.getElementById("photons_input").value = game.autoqu_goal[0]
        document.getElementById("time_input3").value = game.autoqu_goal[1]
        if (game.om_bought[1])
            document.getElementById("step_input").value = game.autoqu_goal[2]
        autoqu_switch(game.autoqu_mode)
    } else {
        document.getElementById("autoqu_block").style.display = "none"
    }

    if (game.om_bought[0]) {
        cl_toggle()
        cl_toggle()
    }

    if (game.om_bought[5]) {
        gr_toggle()
        gr_toggle()
    }

    if (game.om_bought[3]) {
        ps_toggle()
        ps_toggle()
    }

    if (game.prestige >= 1 || game.reboot >= 1 || game.quantum >= 1) {
        past_resets_mode(1)
        past_resets_mode(1)
    }

    if (game.reboot >= 1 || game.quantum >= 1) {
        past_resets_mode(2)
        past_resets_mode(2)
    }

    document.getElementById("level_input").value = game.autopr_goal[0]
    document.getElementById("amp_input").value = game.autopr_goal[1]
    document.getElementById("pp_input").value = game.autopr_goal[2]
    document.getElementById("time_input").value = game.autopr_goal[3]

    document.getElementById("hue_input").value = game.custom_hue

    document.getElementById("refresh_input").value = game.refresh_rate
}
